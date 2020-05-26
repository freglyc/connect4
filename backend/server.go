package connect4

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
	"time"
)

// Websocket upgrade
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Storage system used to save games to disk
type Store interface {
	Save(*Game) error
}

// Server used to serve HTTP requests
type Server struct {
	Server http.Server             // HTTP server
	Mux    *mux.Router             // Allows pattern matching on URL
	Mutex  sync.Mutex              // Allows for server mutex
	Store  Store                   // Storage system used to store games to disk
	Games  map[string]*GameHandler // Mapping of gameIDs to current game handlers
}

// Game handler that manages an in progress game
type GameHandler struct {
	Game       *Game      // The game being played
	Store      Store      // Storage system used to store games to disk
	Mutex      sync.Mutex // Allows for game mutex
	Marshaled  []byte     // Store json
	WebSockets map[*websocket.Conn]bool
	// Channels or mutex work in this case

	// would need a channel for receiving
	// Do I actually need a channel for receiveing concurrent requests? Do some research to see wha the standard is and if
	// I would drop requests if I don't have one. I'm pretty sure I do need one but in what capacity and do I need an
	// Overall one for the server itself as well
	// would need a making of websocket.Conn:bool for registering connections
}

// Create a new game handler
func NewHandler(game *Game, store Store) *GameHandler {
	handler := &GameHandler{
		Game:       game,
		Store:      store,
		Mutex:      sync.Mutex{},
		Marshaled:  nil,
		WebSockets: make(map[*websocket.Conn]bool),
	}
	err := store.Save(handler.Game)
	if err != nil {
		log.Printf("Unable to write new game %q to disk: %s\n", handler.Game.GameID, err)
	}
	return handler
}

// Update a game handler
func (handler *GameHandler) Update(fn func(*Game) bool) {
	handler.Mutex.Lock()
	defer handler.Mutex.Unlock()
	ok := fn(handler.Game)
	handler.Game.UpdatedAt = time.Now()
	if !ok {
		return
	}
	handler.Marshaled = nil
	err := handler.Store.Save(handler.Game)
	if err != nil {
		log.Printf("Unable to write updated game %q to disk: %s\n", handler.Game.GameID, err)
	}
}

// If it exists get a game handler otherwise create one
func (server *Server) GetOrCreateGameHandler(gameID string, players int) *GameHandler {
	server.Mutex.Lock()
	defer server.Mutex.Unlock()
	handler, ok := server.Games[gameID]
	if !ok {
		handler = NewHandler(NewGame(gameID, Options{
			Players: players, Rows: 9, Columns: 9, Crazy: false,
		}), server.Store)
		server.Games[gameID] = handler
	}
	return handler
}

// Update game handler json.Marshal
func (handler *GameHandler) MarshalJSON() ([]byte, error) {
	handler.Mutex.Lock()
	defer handler.Mutex.Unlock()
	var err error
	if handler.Marshaled == nil {
		handler.Marshaled, err = json.Marshal(struct {
			*Game
			StateID string `json:"state_id"`
		}{handler.Game, handler.Game.StateID()})
	}
	return handler.Marshaled, err
}

// WS connection - get or create a game and user subscribes to future updates
func (server *Server) HandleGetOrCreate(rw http.ResponseWriter, req *http.Request) {
	ws, err := upgrader.Upgrade(rw, req, nil)
	if err != nil {
		http.Error(rw, "failed to upgrade", 400)
		return
	}
	var request struct {
		GameID  string `json:"game_id"`
		Players int    `json:"players"`
	}
	err = ws.ReadJSON(&request)
	if err != nil {
		return
	}
	if request.Players < 2 || request.Players > 4 {
		http.Error(rw, "invalid parameters", 400)
		return
	}
	handler := server.GetOrCreateGameHandler(request.GameID, request.Players)
	handler.WebSockets[ws] = true
	handler.WriteGame()
}

// POST place - places a token on a given column
func (server *Server) HandlePlace(rw http.ResponseWriter, req *http.Request) {
	var request struct {
		GameID string `json:"game_id"`
		Column int    `json:"column"`
	}
	decoder := json.NewDecoder(req.Body)
	if err := decoder.Decode(&request); err != nil {
		http.Error(rw, "Error decoding", 400)
		return
	}
	handler := server.GetOrCreateGameHandler(request.GameID, 2)
	var err error
	handler.Update(func(game *Game) bool {
		err = game.PlaceToken(request.Column)
		return err == nil
	})
	if err != nil {
		http.Error(rw, err.Error(), 400)
		return
	}
	handler.WriteGame()
	rw.Write([]byte("success"))
}

// POST next - changes turns
func (server *Server) HandleNextTurn(rw http.ResponseWriter, req *http.Request) {
	var request struct {
		GameID string `json:"game_id"`
	}
	if err := json.NewDecoder(req.Body).Decode(&request); err != nil {
		http.Error(rw, "Error decoding", 400)
		return
	}
	handler := server.GetOrCreateGameHandler(request.GameID, 2)
	var err error
	handler.Update(func(game *Game) bool {
		game.NextTurn()
		return err == nil
	})
	if err != nil {
		http.Error(rw, err.Error(), 400)
		return
	}
	handler.WriteGame()
	rw.Write([]byte("success"))
}

// POST reset - resets the game to blank
func (server *Server) HandleReset(rw http.ResponseWriter, req *http.Request) {
	var request struct {
		GameID string `json:"game_id"`
	}
	if err := json.NewDecoder(req.Body).Decode(&request); err != nil {
		http.Error(rw, "Error decoding", 400)
		return
	}
	handler := server.GetOrCreateGameHandler(request.GameID, 2)
	var err error
	handler.Update(func(game *Game) bool {
		game.Reset()
		return err == nil
	})
	if err != nil {
		http.Error(rw, err.Error(), 400)
		return
	}
	handler.WriteGame()
	rw.Write([]byte("success"))
}

// Remove old completed and expired games
func (server *Server) RemoveOldGames() {
	server.Mutex.Lock()
	defer server.Mutex.Unlock()
	for id, handler := range server.Games {
		handler.Mutex.Lock()
		if handler.Game.GameState.Winner != Neutral && handler.Game.CreatedAt.Add(3*time.Hour).Before(time.Now()) {
			delete(server.Games, id)
			log.Printf("Removed completed game %s\n", id)
		} else if handler.Game.CreatedAt.Add(72 * time.Hour).Before(time.Now()) {
			delete(server.Games, id)
			log.Printf("Removed expired game %s\n", id)
		}
		handler.Mutex.Unlock()
	}
}

// Start the server
func (server *Server) Start(games map[string]*Game) error {
	server.Mux = mux.NewRouter()
	server.Mux.HandleFunc("/create", server.HandleGetOrCreate) // WEBSOCKET CONNECTION
	server.Mux.HandleFunc("/place", server.HandlePlace).Methods("POST")
	server.Mux.HandleFunc("/next", server.HandleNextTurn).Methods("POST")
	server.Mux.HandleFunc("/reset", server.HandleReset).Methods("POST")
	server.Games = make(map[string]*GameHandler)
	server.Server.Handler = http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		server.Mux.ServeHTTP(rw, req)
	})
	if server.Store == nil {
		server.Store = NilStore{}
	}
	if games != nil {
		for _, game := range games {
			server.Games[game.GameID] = NewHandler(game, server.Store)
		}
	}
	go func() {
		for range time.Tick(60 * time.Minute) {
			server.RemoveOldGames()
		}
	}()
	return server.Server.ListenAndServe()
}

// Write a game back to connected clients
func (handler *GameHandler) WriteGame() {
	data, err := json.Marshal(handler)
	if err != nil {
		return
	}
	// writes to connected clients of game
	for conn := range handler.WebSockets {
		err = conn.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			conn.Close()
			delete(handler.WebSockets, conn)
		}
	}
}

package connect4

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"time"
)

// Team structures and function
type Team int

const (
	Neutral Team = iota
	Red
	Blue
	Green
	Yellow
)

func (team Team) String() string {
	switch team {
	case Red:
		return "Red"
	case Blue:
		return "Blue"
	case Green:
		return "Green"
	case Yellow:
		return "Yellow"
	default:
		return "Neutral"
	}
}

func (team *Team) UnmarshalJSON(b []byte) error {
	var s string
	err := json.Unmarshal(b, &s)
	if err != nil {
		return err
	}
	switch s {
	case "Red":
		*team = Red
	case "Blue":
		*team = Blue
	case "Green":
		*team = Green
	case "Yellow":
		*team = Yellow
	default:
		*team = Neutral
	}
	return nil
}

func (team Team) MarshalJSON() ([]byte, error) {
	return json.Marshal(team.String())
}

// Game structures and functions
type Options struct {
	Players int  `json:"players"`
	Rows    int  `json:"rows"`
	Columns int  `json:"columns"`
	Crazy   bool `json:"crazy"`
}

type GameState struct {
	Teams  []Team   `json:"teams"`
	Turn   Team     `json:"turn"`
	Board  [][]Team `json:"board"`
	Winner Team     `json:"winner"`
}

type Game struct {
	GameID    string    `json:"game_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	GameState
	Options
}

func NewGameState(options Options) GameState {
	// Init teams array
	var teams = make([]Team, options.Players)
	teams[0] = Red
	teams[1] = Blue
	if options.Players >= 3 {
		teams[2] = Green
	}
	if options.Players == 4 {
		teams[3] = Yellow
	}
	// Init board
	var board = make([][]Team, options.Rows)
	for i := 0; i < options.Rows; i++ {
		board[i] = make([]Team, options.Columns)
	}
	// Init game state
	state := GameState{
		Teams:  teams,
		Turn:   teams[rand.Intn(options.Players)],
		Board:  board,
		Winner: Neutral,
	}
	return state
}

func (game *Game) StateID() string {
	return fmt.Sprintf("%019d", game.UpdatedAt.UnixNano())
}

// Checks and updates winner
func (game *Game) CheckWinner() {
	// Do not check if game already over
	if game.GameState.Winner != Neutral {
		return
	}
	// Check verticals
	for i := 0; i < game.Options.Rows-3; i++ {
		for j := 0; j < game.Options.Columns; j++ {
			if winner := game.VerticalCheck(i, j); winner != Neutral {
				game.GameState.Winner = winner
			}
		}
	}
	// Check horizontal
	for i := 0; i < game.Options.Rows; i++ {
		for j := 0; j < game.Options.Columns-3; j++ {
			if winner := game.HorizontalCheck(i, j); winner != Neutral {
				game.GameState.Winner = winner
			}
		}
	}
	// Check positive diagonal
	for i := 0; i < game.Options.Rows-3; i++ {
		for j := 0; j < game.Options.Columns-3; j++ {
			if winner := game.PositiveDiagonalCheck(i, j); winner != Neutral {
				game.GameState.Winner = winner
			}
		}
	}
	// Check negative diagonal
	for i := 0; i < game.Options.Rows-3; i++ {
		for j := 3; j < game.Options.Columns; j++ {
			if winner := game.NegativeDiagonalCheck(i, j); winner != Neutral {
				game.GameState.Winner = winner
			}
		}
	}
}

func (game *Game) VerticalCheck(x, y int) Team {
	for i := 0; i < game.Options.Players; i++ {
		var team = game.GameState.Teams[i]
		if game.GameState.Board[x][y] == team && game.GameState.Board[x+1][y] == team &&
			game.GameState.Board[x+2][y] == team && game.GameState.Board[x+3][y] == team {
			return team
		}
	}
	return Neutral
}

func (game *Game) HorizontalCheck(x, y int) Team {
	for i := 0; i < game.Options.Players; i++ {
		var team = game.GameState.Teams[i]
		if game.GameState.Board[x][y] == team && game.GameState.Board[x][y+1] == team &&
			game.GameState.Board[x][y+2] == team && game.GameState.Board[x][y+3] == team {
			return team
		}
	}
	return Neutral
}

func (game *Game) PositiveDiagonalCheck(x, y int) Team {
	for i := 0; i < game.Options.Players; i++ {
		var team = game.GameState.Teams[i]
		if game.GameState.Board[x][y] == team && game.GameState.Board[x+1][y+1] == team &&
			game.GameState.Board[x+2][y+2] == team && game.GameState.Board[x+3][y+3] == team {
			return team
		}
	}
	return Neutral
}

func (game *Game) NegativeDiagonalCheck(x, y int) Team {
	for i := 0; i < game.Options.Players; i++ {
		var team = game.GameState.Teams[i]
		if game.GameState.Board[x][y] == team && game.GameState.Board[x-1][y+1] == team &&
			game.GameState.Board[x-2][y+2] == team && game.GameState.Board[x-3][y+3] == team {
			return team
		}
	}
	return Neutral
}

// Place a token in the given column
func (game *Game) PlaceToken(y int) error {
	if game.GameState.Winner != Neutral {
		return fmt.Errorf("game already over")
	}
	for i := game.Options.Rows - 1; i >= 0; i-- {
		if game.GameState.Board[i][y] == Neutral {
			game.GameState.Board[i][y] = game.GameState.Turn
			game.CheckWinner()
			game.NextTurn()
			return nil
		}
	}
	return fmt.Errorf("column has already been filled")
}

// Change turn
func (game *Game) NextTurn() {
	for i := 0; i < len(game.GameState.Teams); i++ {
		if game.GameState.Turn == game.GameState.Teams[i] {
			game.GameState.Turn = game.GameState.Teams[(i+1)%game.Options.Players]
			return
		}
	}
}

// Reset game state
func (game *Game) Reset() {
	game.GameState = NewGameState(game.Options)
}

// Prints the current board state
func (game *Game) String() string {
	var result = ""
	for i := 0; i < game.Options.Rows; i++ {
		for j := 0; j < game.Options.Columns; j++ {
			result += game.GameState.Board[i][j].String()[:1] + " "
		}
		result += "\n"
	}
	return result
}

// Create a new game
func NewGame(gameID string, options Options) *Game {
	// Init game
	game := &Game{
		GameID:    gameID,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
		GameState: NewGameState(options),
		Options:   options,
	}
	return game
}

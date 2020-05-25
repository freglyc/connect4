package connect4

import (
	"encoding/json"
	"fmt"
	"github.com/cockroachdb/pebble"
	"math"
	"time"
)

// Pebble store
type PebbleStore struct {
	DB *pebble.DB
}

// Loads all games from storage
func (store *PebbleStore) Restore() (map[string]*Game, error) {
	iter := store.DB.NewIter(&pebble.IterOptions{
		LowerBound: []byte("/games/"),
		UpperBound: []byte(fmt.Sprintf("/games/%019d", math.MaxInt64)),
	})
	defer iter.Close()
	games := make(map[string]*Game)
	for _ = iter.First(); iter.Valid(); iter.Next() {
		var g Game
		err := json.Unmarshal(iter.Value(), &g)
		if err != nil {
			return nil, fmt.Errorf("unmarshal game: %w", err)
		}
		games[g.GameID] = &g
	}
	if err := iter.Error(); err != nil {
		return nil, fmt.Errorf("restore iter: %w", err)
	}
	return games, nil
}

// Deletes all games created before expiry time
func (store *PebbleStore) DeleteExpired(expiry time.Time) error {
	return store.DB.DeleteRange(
		MakeKey(0, ""),
		MakeKey(expiry.Unix(), ""),
		nil,
	)
}

// Saves a game to storage
func (store *PebbleStore) Save(game *Game) error {
	key, value, err := GetKeyValue(game)
	if err != nil {
		return fmt.Errorf("trySave: %w", err)
	}
	err = store.DB.Set(key, value, &pebble.WriteOptions{Sync: true})
	if err != nil {
		return fmt.Errorf("db.Set: %w", err)
	}
	return err
}

// Get a key value paring from game
func GetKeyValue(game *Game) (key, value []byte, err error) {
	value, err = json.Marshal(game)
	if err != nil {
		return nil, nil, fmt.Errorf("marshaling GameState: %w", err)
	}
	return MakeKey(game.CreatedAt.Unix(), game.GameID), value, nil
}

// Make a key
func MakeKey(unixSecs int64, id string) []byte {
	return []byte(fmt.Sprintf("/games/%019d/%q", unixSecs, id))
}

// Nil store used if no store available
type NilStore struct{}

// Does nothing
func (store NilStore) Save(*Game) error { return nil }

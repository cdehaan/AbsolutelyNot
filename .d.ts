export type Player = {
    player_key:  number | null,
    name:        string,
    secret:      string | null,
    game_key:    number | null,
    last_action: Date | null,
    active:      boolean
}

export type Competitors = Array<Player>

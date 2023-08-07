export type RootStackParamList = {
    FirstScreen: undefined;
    JoinScreen:  undefined;
    Lobby:       undefined;
};

export type Player = {
    player_key:  number;
    name:        string;
    secret?:     string;
    game_key:    number;
    last_action: number;
    active:      boolean;
}
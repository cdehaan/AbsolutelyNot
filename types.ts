export type RootStackParamList = {
    FirstScreen: undefined;
    JoinScreen:  undefined;
    Lobby:       undefined;
};

export type Player = {
    playerKey:   number  | null;
    name:        string  | null;
    picture:     string  | null;
    secret?:     string  | null; // yes, both undefined and null have meaning
    gameKey:     number  | null;
    lastAction:  number  | null;
    active:      boolean | null;
}

export type Game = {
    game_key:     number  | null;
    code:         string  | null;
    secret:       string  | null;
    question_key: number  | null;
    revealed:     boolean | null;
    private:      boolean | null;
    active:       boolean | null;
    created:      number  | null;
    started:      number  | null;
}
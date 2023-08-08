export type RootStackParamList = {
    FirstScreen: undefined;
    JoinScreen:  undefined;
    Lobby:       undefined;
};

export type Player = {
    playerKey:   number | null;
    name:        string | null;
    picture:     string | null;
    secret?:     string | null; // yes, both undefined and null have meaning
    gameKey:     number | null;
    lastAction:  number | null;
    active:      boolean | null;
}
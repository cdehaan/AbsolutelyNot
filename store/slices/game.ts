import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../../types'

const initialState: Game = {
    game_key:     null,
    code:         null,
    secret:       null,
    question_key: null,
    revealed:     null,
    private:      null,
    active:       null,
    created:      null,
    started:      Date.now(),
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
        state.game_key     = action.payload.game_key
        state.code         = action.payload.code
        state.secret       = action.payload.secret
        state.question_key = action.payload.question_key
        state.revealed     = action.payload.revealed
        state.private      = action.payload.private
        state.active       = action.payload.active
        state.created      = action.payload.created
        state.started      = action.payload.started
    },
    removeGame: (state) => {
        state.game_key     = null
        state.code         = null
        state.secret       = null
        state.question_key = null
        state.revealed     = null
        state.private      = null
        state.active       = null
        state.created      = null
        state.started      = null
    },
    setGameKey:      (state, action: PayloadAction<number>)  => { state.game_key     = action.payload },
    setCode:         (state, action: PayloadAction<string>)  => { state.code         = action.payload },
    setSecret:       (state, action: PayloadAction<string>)  => { state.secret       = action.payload },
    setQuestion_key: (state, action: PayloadAction<number>)  => { state.question_key = action.payload },
    setRevealed:     (state, action: PayloadAction<boolean>) => { state.revealed     = action.payload },
    setPrivate:      (state, action: PayloadAction<boolean>) => { state.private      = action.payload },
    setActive:       (state, action: PayloadAction<boolean>) => { state.active       = action.payload },
    setCreated:      (state, action: PayloadAction<number>)  => { state.created      = action.payload },
    setStarted:      (state, action: PayloadAction<number>)  => { state.started      = action.payload },
  },
})

export const { setGame, removeGame, setGameKey, setCode, setSecret, setQuestion_key, setRevealed, setPrivate, setActive, setCreated, setStarted } = gameSlice.actions

export default gameSlice.reducer


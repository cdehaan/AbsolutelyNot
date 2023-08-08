import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Player } from '../../types'

const initialState: Player = {
  playerKey: null,
  name: 'Guest',
  picture: null,
  gameKey: null,
  lastAction: null,
  active: false
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      state.playerKey = action.payload.playerKey
      state.name = action.payload.name
      state.gameKey = action.payload.gameKey
      state.lastAction = action.payload.lastAction
      state.active = action.payload.active
    },
    removePlayer: (state) => {
        state.playerKey = null
        state.name = 'Guest'
        state.picture = null
        state.gameKey = null
        state.lastAction = null
        state.active = null
    },
    setPlayerKey:  (state, action: PayloadAction<number>)  => { state.playerKey  = action.payload },
    setName:       (state, action: PayloadAction<string>)  => { state.name       = action.payload },
    setPicture:    (state, action: PayloadAction<string>)  => { state.picture    = action.payload },
    setSecret:     (state, action: PayloadAction<string>)  => { state.secret     = action.payload },
    setGameKey:    (state, action: PayloadAction<number>)  => { state.gameKey    = action.payload },
    setLastAction: (state, action: PayloadAction<number>)  => { state.lastAction = action.payload },
    setActive:     (state, action: PayloadAction<boolean>) => { state.active     = action.payload },
  },
})

export const { setPlayer, removePlayer, setPlayerKey, setName, setPicture, setSecret, setGameKey, setLastAction, setActive } = playerSlice.actions

export default playerSlice.reducer
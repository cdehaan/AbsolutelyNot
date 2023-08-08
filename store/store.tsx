import { configureStore } from '@reduxjs/toolkit'
import googleUserReducer from './slices/googleAccount'
import playerReducer from './slices/player'
import competitorsReducer from './slices/competitors'
import gameReducer from './slices/game'

export const store = configureStore({
  reducer: {
    googleUser: googleUserReducer,
    player: playerReducer,
    competitors: competitorsReducer,
    game: gameReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
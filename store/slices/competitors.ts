import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Player } from '../../types'

interface CompetitorPayload {
  playerKey: number;
  player: Player;
}

//const initialState: Array<Player> = []

const initialState: Array<Player> = [
  {
    playerKey: 12,
    name: 'Ryan',
    picture: 'data:image/png;base64,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',
    gameKey: null,
    lastAction: null,
    active: false  
  },
  {
    playerKey: 13,
    name: 'Dave',
    picture: 'data:image/png;base64,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',
    gameKey: null,
    lastAction: null,
    active: false  
  },
]

export const competitorsSlice = createSlice({
  name: 'competitors',
  initialState,
  reducers: {
    addCompetitor: (state, action: PayloadAction<CompetitorPayload>) => {
      const newCompetitor = {
        playerKey: action.payload.player.playerKey,
        name: action.payload.player.name,
        picture: action.payload.player.picture,
        gameKey: action.payload.player.gameKey,
        lastAction: action.payload.player.lastAction,
        active: action.payload.player.active,
      }
      state.push(newCompetitor)
    },

    // This is a bit WET, but pulling it out is a bit messy too
    setPlayerKey:  (state, action: PayloadAction<CompetitorPayload>) => { const competitor = state.find(competitor => {competitor.playerKey === action.payload.playerKey}); if(competitor) competitor.playerKey  = action.payload.playerKey },
    setName:       (state, action: PayloadAction<CompetitorPayload>) => { const competitor = state.find(competitor => {competitor.playerKey === action.payload.playerKey}); if(competitor) competitor.name       = action.payload.player.name },
    setPicture:    (state, action: PayloadAction<CompetitorPayload>) => { const competitor = state.find(competitor => {competitor.playerKey === action.payload.playerKey}); if(competitor) competitor.picture    = action.payload.player.picture },
    setGameKey:    (state, action: PayloadAction<CompetitorPayload>) => { const competitor = state.find(competitor => {competitor.playerKey === action.payload.playerKey}); if(competitor) competitor.gameKey    = action.payload.player.gameKey },
    setLastAction: (state, action: PayloadAction<CompetitorPayload>) => { const competitor = state.find(competitor => {competitor.playerKey === action.payload.playerKey}); if(competitor) competitor.lastAction = action.payload.player.lastAction },
    setActive:     (state, action: PayloadAction<CompetitorPayload>) => { const competitor = state.find(competitor => {competitor.playerKey === action.payload.playerKey}); if(competitor) competitor.active     = action.payload.player.active },
  },
})

export const { addCompetitor, setPlayerKey, setName, setPicture, setLastAction, setActive } = competitorsSlice.actions

export default competitorsSlice.reducer
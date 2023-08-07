import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SigninStatus {
  UNKNOWN = "unknown",
  NOT_SIGNED_IN = "not_signed_in",
  SIGNING_IN = "signing_in",
  SIGNED_IN = "signed_in",
  ERROR = "error",
}

interface GoogleUser {
  isSignedIn: SigninStatus,
  name: string | null,
  email: string | null,
  profilePictureURL: string | null,
  internalID: string | null,
}

const initialState: GoogleUser = {
  isSignedIn: SigninStatus.UNKNOWN,
  name: null,
  email: null,
  profilePictureURL: null,
  internalID: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGoogleUser: (state, action: PayloadAction<GoogleUser>) => {
      state.isSignedIn = action.payload.isSignedIn
      state.email = action.payload.email
      state.profilePictureURL = action.payload.profilePictureURL
      state.internalID = action.payload.internalID
    },
    setSignedIn: (state, action: PayloadAction<SigninStatus>) => {
      state.isSignedIn = action.payload
    },
  },
})

export const { setGoogleUser, setSignedIn } = userSlice.actions

export default userSlice.reducer
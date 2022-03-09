import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Profile } from "../types/state";
import mock from "./mock";

export interface ProfileState {
  profile: Profile;
}

const initialState: ProfileState = {
  profile: mock.stevenProfile,
};

export const profileSlice = createSlice({
  name: "profileState",
  initialState,
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
});

export const { increment, decrement, incrementByAmount } = profileSlice.actions;

export default profileSlice.reducer;

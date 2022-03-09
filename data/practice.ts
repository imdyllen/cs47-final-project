import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Practice, Question } from "../types/state";
import mock from "./mock";

export interface PracticeState {
  practices: Practice[];
  qotd: Question;
  qotdFinished: boolean;
  progress: {
    [key: string]: number;
  };
}

const initialState: PracticeState = {
  practices: mock.practices,
  qotd: mock.questionOfTheDay,
  qotdFinished: false,
  progress: {
    "1": 0,
  },
};

export const practiceSlice = createSlice({
  name: "practiceState",
  initialState,
  reducers: {
    setQotdFinished: (state) => {
      state.qotdFinished = true;
    },
    setPracticeProgress: (
      state,
      action: PayloadAction<{
        practiceId: string;
        progress: number;
      }>
    ) => {
      state.progress[action.payload.practiceId] = action.payload.progress;
    },
  },
});

export const { setQotdFinished, setPracticeProgress } = practiceSlice.actions;

export default practiceSlice.reducer;

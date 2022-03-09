import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Agreement } from "../types/state";
import mock from "./mock";

export interface AgreementSettings {
  timer: number;
}

export interface PostState {
  agreements: Agreement[];
  settings: AgreementSettings;
}

const initialState: PostState = {
  agreements: mock.agreements,
  settings: {
    timer: 2 * 60,
  },
};

export const agreementSlice = createSlice({
  name: "agreementState",
  initialState,
  reducers: {
    setSettings: (
      state,
      action: PayloadAction<{
        settings: AgreementSettings;
      }>
    ) => {
      state.settings = action.payload.settings;
    },
    addAgreement: (
      state,
      action: PayloadAction<{
        agreement: Agreement;
      }>
    ) => {
      state.agreements.unshift(action.payload.agreement);
    },
    deleteAgreement: (
      state,
      action: PayloadAction<{
        agreementId: string;
      }>
    ) => {
      const index = state.agreements.findIndex(
        (r) => r.id === action.payload.agreementId
      );
      state.agreements.splice(index, 1);
    },
    editAgreement: (
      state,
      action: PayloadAction<{
        agreementId: string;
        agreement: Agreement;
      }>
    ) => {
      const index = state.agreements.findIndex(
        (r) => r.id === action.payload.agreementId
      );
      state.agreements[index] = action.payload.agreement;
    },
  },
});

export const { setSettings, addAgreement, deleteAgreement, editAgreement } =
  agreementSlice.actions;

export default agreementSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserStateTypes = {
  username: string;
  nickname: string;
};

const INITIAL_STATE = { username: "", nickname: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    loginReducer: (
      state: UserStateTypes,
      action: PayloadAction<UserStateTypes>
    ) => {
      return action.payload;
    },
    logoutReducer: () => INITIAL_STATE
  }
});

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;

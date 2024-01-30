import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { UserStateTypes } from "./userReducer";

export type StateType = {
  user: UserStateTypes;
};

export default configureStore({
  reducer: {
    user: userReducer
  }
});

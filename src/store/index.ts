import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { UserStateTypes } from "./userReducer";

export type StateType = {
  user: UserStateTypes;
};

export default configureStore({
  reducer: {
    user: userReducer

    // 组件列表

    // 问卷信息 title desc ...
  }
});

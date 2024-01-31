import { configureStore } from "@reduxjs/toolkit";
import { UserStateTypes } from "./userReducer";
import userReducer from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";

export type StateType = {
  user: UserStateTypes;
  components: ComponentsStateType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer

    // 组件列表

    // 问卷信息 title desc ...
  }
});

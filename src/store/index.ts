import { configureStore } from "@reduxjs/toolkit";
import { UserStateTypes } from "./userReducer";
import userReducer from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";

export type StateType = {
  user: UserStateTypes;
  components: ComponentsStateType;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,

    //  页面设置状态
    pageInfo: pageInfoReducer
  }
});

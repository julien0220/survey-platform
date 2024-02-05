import { configureStore } from "@reduxjs/toolkit";
import { UserStateTypes } from "./userReducer";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
import userReducer from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";

export type StateType = {
  user: UserStateTypes;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      filter: excludeAction([
        "components/changeSelectedId",
        "components/selectPrevComponent",
        "components/selectNextComponent",
        "components/resetComponents"
      ]),
      limit: 10
    }),

    //  页面设置状态
    pageInfo: pageInfoReducer
  }
});

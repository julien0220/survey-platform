/* eslint-disable */
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {produce} from "immer";
import { ComponentPropsType } from "../../components/QuestionComponents";
import {getNextSelectedId, insertNewComponent} from "./utils";
import cloneDeep from "lodash.clonedeep";

export type ComponentInfoType = {
  fe_id: string; //
  type: string;
  title: string;
  isHidden?: boolean,
  isLocked?: boolean,
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  // extensions
  copiedComponent: null
  
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>
    ) => {
      return action.payload;
    },

    // 修改 selectedId
    changeSelectedId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      }
    ),

    // 添加新组件
      addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload;
        insertNewComponent(draft, newComponent);  
      }
      ),

      // 修改组件属性
      changeComponentProps: produce((draft:ComponentsStateType, action: PayloadAction<{fe_id: string; newProps: ComponentPropsType}>) =>{
        const {fe_id, newProps} = action.payload;
        const {componentList} = draft;
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp,
            ...newProps
          }
        }
      }),

      // 删除选中的组件
      deleteSelectedComponent: produce((draft: ComponentsStateType) => {
        const {selectedId, componentList = []} = draft;
        const index = componentList.findIndex((c) => c.fe_id === selectedId);
        if (index >= 0) {
          const newId = getNextSelectedId(selectedId, componentList);
          draft.componentList.splice(index, 1);
          draft.selectedId = newId;
        }
      }),

      // 隐藏/显示组件
      changeComponentHidden: produce((draft: ComponentsStateType, action: PayloadAction<{fe_id:string; isHidden:boolean}>) => {
        const { componentList = []} = draft;
        const {fe_id, isHidden} = action.payload;
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        let newId = '';
        if (isHidden) {
          newId = getNextSelectedId(fe_id, componentList);
        } else {
          newId = fe_id;
        }
        
        draft.selectedId = newId;
        if (curComp) {
          curComp.isHidden = isHidden;
        }
        
      }),

      // 锁定/解锁组件
      toggleComponentLocked: produce((draft:ComponentsStateType,action:PayloadAction<{fe_id:string}>)=>{
        const {fe_id} = action.payload;
        const {componentList} = draft;
        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      }),

      // 拷贝当前选中的组件
      copySelectedComponent: produce((draft: ComponentsStateType) => {
        const {selectedId, componentList} = draft;
        const curComp = componentList.find((c) => c.fe_id === selectedId);
        if (curComp) {
          draft.copiedComponent = cloneDeep(curComp);
        }
      }),

      // 粘贴组件
      pasteSelectedComponent: produce((draft:ComponentsStateType)=>{
        const {copiedComponent} = draft;
        if (copiedComponent === null) return;
        
        // 修改fe_id
        copiedComponent.fe_id = nanoid();

        // 插入
        insertNewComponent(draft, copiedComponent);  

      }),

      // 选中上一个组件
      selectPrevComponent: produce((draft: ComponentsStateType) => {
        const {selectedId, componentList} = draft;
        const selectedIndex = componentList.findIndex((c)=>c.fe_id === selectedId);
        
        if (selectedIndex < 0) return;
        if (selectedIndex === 0) return;

        draft.selectedId = componentList[selectedIndex - 1].fe_id;
      } ),

      // 选中下一个组件
      selectNextComponent: produce((draft: ComponentsStateType) => {
        const {selectedId, componentList} = draft;
        const selectedIndex = componentList.findIndex((c)=>c.fe_id === selectedId);
        
        if (selectedIndex < 0) return;
        if (selectedIndex === componentList.length - 1) return;

        draft.selectedId = componentList[selectedIndex + 1].fe_id;
      })


      
  
  }
});

export const { resetComponents, changeSelectedId, addComponent, 
  changeComponentProps, deleteSelectedComponent, 
  changeComponentHidden, toggleComponentLocked, 
  copySelectedComponent, pasteSelectedComponent,
  selectPrevComponent, selectNextComponent  } = componentsSlice.actions;

export default componentsSlice.reducer;

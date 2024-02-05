import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent,
  selectNextComponent
} from "../store/componentsReducer";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { selectPrevComponent } from "../store/componentsReducer";

function isActiveElementValid() {
  const activeElem = document.activeElement;
  // 没有增加dnd-kit之前可以正常使用
  // if (activeElem === document.body) return true; // 光标没有focus 到 input

  // 增加dnd-kit之后
  if (activeElem == document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true; // matches:匹配这个元素是不是符合某一个css查询器
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  // 删除组件
  useKeyPress(["Delete", "Backspace"], () => {
    if (!isActiveElementValid()) return;
    dispatch(deleteSelectedComponent());
  });

  // 复制组件
  useKeyPress(["meta.c", "ctrl.c"], () => {
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(["meta.v", "ctrl.v"], () => {
    dispatch(pasteSelectedComponent());
  });

  // 选中上一个组件
  useKeyPress("uparrow", () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  // 选中下一个组件
  useKeyPress("downarrow", () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });

  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    () => {
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true // 严格匹配，必须只要这两个按键才能触发。
    }
  );

  // 重做
  useKeyPress(["ctrl.shift.z", "meta.shift.z"], () => {
    dispatch(UndoActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;

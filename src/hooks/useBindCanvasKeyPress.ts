import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteSelectedComponent
} from "../store/componentsReducer";

function isActiveElementValid() {
  const activeElem = document.activeElement;
  return activeElem === document.body ? true : false;
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
}
export default useBindCanvasKeyPress;

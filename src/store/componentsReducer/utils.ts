import { ComponentElement } from "react";
import { ComponentInfoType, ComponentsStateType } from "./index";

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  const visibleList = componentList.filter((c) => !c.isHidden);
  const index = visibleList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return "";
  if (visibleList.length === 1) return "";
  if (index === visibleList.length - 1) return visibleList[index - 1].fe_id;
  return visibleList[index + 1].fe_id;
}

export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentInfoType
) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);

  if (componentList.length < 0) draft.componentList.push(newComponent);
  else draft.componentList.splice(index + 1, 0, newComponent);

  draft.selectedId = newComponent.fe_id;
}

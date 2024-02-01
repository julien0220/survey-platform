import { ComponentInfoType } from "./index";

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

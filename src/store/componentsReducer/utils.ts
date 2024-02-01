import { ComponentInfoType } from "./index";

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[]
) {
  const index = componentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return "";
  if (componentList.length === 1) return "";
  if (index === componentList.length - 1) return componentList[index - 1].fe_id;
  return componentList[index + 1].fe_id;
}

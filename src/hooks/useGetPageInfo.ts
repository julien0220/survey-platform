import { useSelector } from "react-redux";
import { StateType } from "../store";
import { PageInfoType } from "../store/pageInfoReducer";

export default function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(
    (state) => state.pageInfo
  ) as PageInfoType;
  return pageInfo;
}

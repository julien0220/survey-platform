import { useSelector } from "react-redux";
import { StateType } from "../store";
import { UserStateTypes } from "../store/userReducer";

function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(
    (state) => state.user
  ) as UserStateTypes;
  return { username, nickname };
}

export default useGetUserInfo;

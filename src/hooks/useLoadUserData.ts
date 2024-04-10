import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../services/user";
import { loginReducer } from "../store/userReducer";
import { useDispatch } from "react-redux";

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true); // ajax加载需要时间
  const { username } = useGetUserInfo();
  const dispatch = useDispatch();

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (result) => {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally: () => {
      setWaitingUserData(false);
    }
  });

  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return; // redux store 已经存在用户信息，就不用加载了
    }
    run();
  }, [username]);

  // ajax 加载完用户信息后放在 redux 中，不用返回，所以只需返回一个状态
  return { waitingUserData };
}

export default useLoadUserData;

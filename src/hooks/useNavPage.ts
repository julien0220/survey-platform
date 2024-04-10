import useGetUserInfo from "./useGetUserInfo";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isLoginOrRegisterPage,
  MANAGE_INDEX_PATHNAME,
  isNoNeedUserInfo,
  LOGIN_PATHNAME
} from "../router";

function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (waitingUserData) {
      return;
    }
    if (username) {
      // 登录状态
      if (isLoginOrRegisterPage(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登录状态
    if (isNoNeedUserInfo(pathname)) return;
    else nav(LOGIN_PATHNAME);
  }, [username, pathname]);
}

export default useNavPage;

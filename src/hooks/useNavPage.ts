import useGetUserInfo from "./useGetUserInfo";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isLoginOrRegisterPage,
  MANAGE_INDEX_PATHNAME,
  isNoNeddUserInfo,
  LOGIN_PATHNAME
} from "../router";

function useNavPage(waitngUserData: boolean) {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (waitngUserData) return;
    if (username) {
      // 登录状态
      if (isLoginOrRegisterPage(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登录状态
    if (isNoNeddUserInfo(pathname)) return;
    else nav(LOGIN_PATHNAME);
  }, [username, pathname]);
}

export default useNavPage;

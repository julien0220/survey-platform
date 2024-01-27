import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { removeToken } from "../utils/user-token";

const UserInfo: FC = () => {
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};
  const nav = useNavigate();
  console.log("data", data);

  function logout() {
    removeToken();
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  );

  const login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return (
    <div>
      {/* <Link to={LOGIN_PATHNAME}>登录</Link> */}
      {username ? UserInfo : login}
    </div>
  );
};

export default UserInfo;

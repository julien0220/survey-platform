import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import { Spin } from "antd";
import useNavPage from "../hooks/useNavPage";

const QuestionLayout: FC = () => {
  const { waitngUserData } = useLoadUserData(); // 加载用户信息
  useNavPage(waitngUserData); // 用户没有登陆时，跳转到登录页

  return (
    <div style={{ height: "100vh" }}>
      {/* <p>QuestionLayout</p> */}
      <div>
        {waitngUserData ? (
          <div style={{ textAlign: "center", marginTop: "70px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default QuestionLayout;

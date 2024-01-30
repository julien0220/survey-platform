import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import { Spin } from "antd";

const QuestionLayout: FC = () => {
  const { waitngUserData } = useLoadUserData();

  return (
    <div>
      <p>QuestionLayout</p>
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

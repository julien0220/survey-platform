import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout: FC = () => {
  return (
    <div>
      <p>QuestionLayout</p>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default QuestionLayout;

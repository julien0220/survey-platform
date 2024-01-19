import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const nav = useNavigate();

  return (
    <div>
      <p>login</p>
      <button
        onClick={() => {
          nav(-1);
        }}
      >
        返回上一页
      </button>
    </div>
  );
};

export default Login;

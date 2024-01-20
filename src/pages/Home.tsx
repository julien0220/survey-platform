import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";

const Home: FC = () => {
  const nav = useNavigate();
  function clickHandler() {
    // nav("/login");
    nav("/login?b=20"); // 这种形式要自己拼接字符串，容易出错
    nav({
      pathname: "login",
      search: "b=21"
    });
  }
  return (
    <div>
      <p>home</p>
      <Button onClick={clickHandler} type="primary">
        登录
      </Button>
      <Link to="/register">注册</Link>
      {/* <Link to="/register?a=10">注册</Link> */}
    </div>
  );
};

export default Home;

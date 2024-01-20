import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from "./Home.module.scss";
const { Title, Paragraph } = Typography;

const Home: FC = () => {
  //   const nav = useNavigate();
  //   function clickHandler() {
  //     // nav("/login");
  //     nav("/login?b=20"); // 这种形式要自己拼接字符串，容易出错
  //     nav({
  //       pathname: "login",
  //       search: "b=21"
  //     });
  //   }
  const nav = useNavigate();
  return (
    // <div>
    //   <p>home</p>
    //   <Button onClick={clickHandler} type="primary">
    //     登录
    //   </Button>
    //   <Link to="/register">注册</Link>
    //   <Link to="/register?a=10">注册</Link>
    // </div>
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份， 受到答卷 900 份
        </Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => {
              nav(MANAGE_INDEX_PATHNAME);
            }}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;

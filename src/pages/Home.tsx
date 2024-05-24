import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import Flower from "./Flower";
import styles from "./Home.module.scss";
// import "../_mock/index";
// import axios from "axios";

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

  //   useEffect(() => {
  //     // fetch("/api/test")
  //     //   .then((res) => res.json())
  //     //   .then((data) => console.log("fetch data", data));
  //     // axios.get("/api/test").then((res) => console.log("axios res", res.data)); // axios 内部使用 XMLHttoRequest API，没有用 fetch
  //     //   .then((data) => console.log("fetch data", data));
  //   });

  // 前端3000, api 3001
  // 跨域
  // create-react-app Webpack devServer 代理
  // useEffect(() => {
  //   fetch("/api/test")
  //     .then((res) => {
  //       // console.log("res", res.json());
  //       return res.json();
  //     })
  //     .then((data) => console.log("fetch data", data));
  // }, []);

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
        <Paragraph style={{ fontWeight: "500" }}>
          已累计创建问卷 100+ 份，发布问卷 50+ 份， 受到答卷 100+ 份
        </Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => {
              nav(MANAGE_INDEX_PATHNAME);
            }}
            // style={{ backgroundColor: "#4096FB", color: "#000" }}
          >
            开始使用
          </Button>
        </div>
      </div>
      {/* <div>
        <Flower />
      </div> */}
    </div>
  );
};

export default Home;

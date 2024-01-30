import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";
import styles from "./MainLayout.module.scss";
import Logo from "../components/Logo";
import useLoadUserData from "../hooks/useLoadUserData";
import UserInfo from "../components/UserInfo";

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  const { waitngUserData } = useLoadUserData();
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {waitngUserData ? (
          <div style={{ textAlign: "center", marginTop: "70px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>
        漫旅问卷 &copy; 2023-present. Created by LHJ
      </Footer>
    </Layout>
  );
};

export default MainLayout;

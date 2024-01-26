import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import { Typography, Empty, Spin } from "antd";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import styles from "./Common.module.scss";

const { Title } = Typography;

const Star: FC = () => {
  useTitle("漫旅问卷 - 星标问卷");

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          {/* <h3>搜索</h3> */}
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty />}
        {list.length !== 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}{" "}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
};

export default Star;

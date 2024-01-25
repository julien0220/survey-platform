import React, { FC, useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import { Typography, Spin } from "antd";
import ListSearch from "../../components/ListSearch";
import styles from "./Common.module.scss";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { useTitle } from "ahooks";

const { Title } = Typography;

const List: FC = () => {
  useTitle("漫旅问卷 - 我的问卷");

  // const [searchParams] = useSearchParams();
  // console.log("keyword", searchParams.get("keyword")); // 在url里面查找参数
  const { data = {}, error, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;
  // const [list, setList] = useState([]);
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService();
  //     const { list, total } = data;
  //     setList(list);
  //     setTotal(total);
  //   }
  //   load();
  // }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>load more...... 上划加载更多......</div>
    </>
  );
};

export default List;

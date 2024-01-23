import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import { Typography, Empty } from "antd";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import styles from "./Common.module.scss";

const { Title } = Typography;

const rawQuestionList = [
  {
    _id: "q1", // 为了和 mongoDB 保持一致，使用 _id
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: "3月10日 13:43"
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: "5月20日 17:23"
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: "6月1日 13:53"
  }
];

const Star: FC = () => {
  useTitle("漫旅问卷 - 星标问卷");

  const [questionList, setQuestionList] = useState(rawQuestionList);

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
        {!questionList.length && <Empty />}
        {questionList.length &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}{" "}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;

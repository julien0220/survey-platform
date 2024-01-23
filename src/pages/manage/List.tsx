import React, { FC, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import { Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import styles from "./Common.module.scss";

const { Title } = Typography;
const rawQuestionList = [
  {
    _id: "q1", // 为了和 mongoDB 保持一致，使用 _id
    title: "问卷1",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: "3月10日 13:43"
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: false,
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
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: "7月70日 13:13"
  }
];

const List: FC = () => {
  // const [searchParams] = useSearchParams();
  // console.log("keyword", searchParams.get("keyword")); // 在url里面查找参数
  const [questionList, setQuestionList] = useState(rawQuestionList);

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
        {questionList.length &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>load more...... 上划加载更多......</div>
    </>
  );
};

export default List;

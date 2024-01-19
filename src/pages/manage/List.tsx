import React, { FC, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import styles from "./List.module.scss";

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
  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>
          <h3>搜索</h3>
        </div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};

export default List;

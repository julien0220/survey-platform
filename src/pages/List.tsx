import React, { FC, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import styles from "./List.module.scss";

const rawQuestionList = [
  {
    id: "q1",
    title: "问卷1",
    ispulished: false,
    isStar: false,
    awserCoutn: 5,
    createAt: "3月10日 13:43"
  },
  {
    id: "q2",
    title: "问卷2",
    ispulished: true,
    isStar: false,
    awserCoutn: 5,
    createAt: "5月20日 17:23"
  },
  {
    id: "q3",
    title: "问卷3",
    ispulished: false,
    isStar: true,
    awserCoutn: 5,
    createAt: "6月1日 13:53"
  },
  {
    id: "q4",
    title: "问卷4",
    ispulished: true,
    isStar: true,
    awserCoutn: 5,
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
          const { id } = q;
          return <QuestionCard key={id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>footer</div>
    </>
  );
};

export default List;

import React, { FC } from "react";
import styles from "./QuestionCard.module.scss";

type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createAt: string;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  return (
    <div className={styles.container}>
      <div>title</div>
      button
      <div></div>
    </div>
  );
};

export default QuestionCard;

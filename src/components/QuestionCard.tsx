import React, { FC } from "react";
import styles from "./questionCard.module.css";

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
    <>
      <p>QuestionCard</p>
    </>
  );
};

export default QuestionCard;

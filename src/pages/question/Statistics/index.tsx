import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Statistics: FC = () => {
  const { loading } = useLoadQuestionData();

  return (
    <div>
      <p>statistics page</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify("sad")}</p>}
    </div>
  );
};

export default Statistics;

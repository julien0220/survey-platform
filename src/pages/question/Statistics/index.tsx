import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Statistics: FC = () => {
  const { loading, data } = useLoadQuestionData();

  return (
    <div>
      <p>statistics page</p>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default Statistics;

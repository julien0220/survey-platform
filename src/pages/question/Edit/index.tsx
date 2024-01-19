import React, { FC } from "react";
import { useParams } from "react-router-dom";

const Edit: FC = () => {
  const { id } = useParams(); // 解析获取路由动态参数
  return <>Edit {id}</>;
};

export default Edit;

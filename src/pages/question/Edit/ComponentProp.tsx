import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props } = selectedComponent; // 通过当前选中的组件找到类型
  const componentConf = getComponentConfByType(type); // 再通过当前的类型找到配置
  if (componentConf == null) return <NoProp />;

  const { PropComponent } = componentConf; // 再通过配置找到属性组件

  return <PropComponent {...props} />;
};

export default ComponentProp;

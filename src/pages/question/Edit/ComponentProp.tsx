import React, { FC } from "react";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  getComponentConfByType,
  ComponentPropsType
} from "../../../components/QuestionComponents";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props } = selectedComponent; // 通过当前选中的组件找到类型
  const componentConf = getComponentConfByType(type); // 再通过当前的类型找到配置
  if (componentConf == null) return <NoProp />;

  function changeProps(newProps: ComponentPropsType) {
    // 统一到这里，再进行修改
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
    // selectedComponent.props = newProps;
  }

  const { PropComponent } = componentConf; // 再通过配置找到属性组件
  return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;

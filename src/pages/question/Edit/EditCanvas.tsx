import React, { FC } from "react";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { ComponentInfoType } from "../../../store/componentsReducer";
import styles from "./EditCanvas.module.scss";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo; // 每个组建的信息，从 redux store 中获取（服务端）

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c;

        return (
          <div key={fe_id} className={styles["component-wrapper"]}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default EditCanvas;

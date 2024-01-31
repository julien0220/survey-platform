import React, { FC } from "react";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import styles from "./EditCanvas.module.scss";

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();
  console.log(componentList);
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  return <div className={styles.canvas}>canvas</div>;
};

export default EditCanvas;

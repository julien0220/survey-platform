import React, { FC } from "react";
import { Spin } from "antd";
import styles from "./EditCanvas.module.scss";

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  return <div className={styles.canvas}>canvas</div>;
};

export default EditCanvas;

import React, { FC, MouseEvent } from "react";
import { Spin } from "antd";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import {
  ComponentInfoType,
  changeSelectedId
} from "../../../store/componentsReducer";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
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
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  useBindCanvasKeyPress();

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Spin />
      </div>
    );
  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;

          // 拼接 class name
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked
          });

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => {
                handleClick(e, fe_id);
              }}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default EditCanvas;

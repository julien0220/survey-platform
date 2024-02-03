import React, { FC, useState, ChangeEvent } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDispatch } from "react-redux";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";
import styles from "./Layers.module.scss";
import { Button, Input, Space, message } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import classNames from "classnames";
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked,
  moveComponent
} from "../../../store/componentsReducer";

const Layers: FC = () => {
  const dispatch = useDispatch();
  const { componentList, selectedId } = useGetComponentInfo();
  const [changingTitleId, setChangingTitleId] = useState("");

  const componentListWithId = componentList.map((item) => {
    return { ...item, id: item.fe_id };
  });

  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((c) => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info("不能选中已隐藏组件");
      return;
    }
    if (fe_id !== selectedId) dispatch(changeSelectedId(fe_id));
    setChangingTitleId(fe_id);
    return;
  }

  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  }

  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }

  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) {
      message.info("标题不能为空");
      return;
    }
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, newTitle }));
  }

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }));
  }

  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map((item) => {
        const { fe_id, title, isHidden, isLocked } = item;

        // 拼接 title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId
        });

        return (
          <SortableItem id={fe_id} key={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={titleClassName}
                onClick={() => {
                  handleTitleClick(fe_id);
                }}
              >
                {fe_id === changingTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => {
                      setChangingTitleId("");
                    }}
                    onBlur={() => {
                      setChangingTitleId("");
                      console.log("changingTitleId", changingTitleId);
                      console.log("fe_id", fe_id);
                    }}
                  />
                )}
                {fe_id !== changingTitleId && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={isHidden ? styles.btn : ""}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? "primary" : "text"}
                    onClick={() => {
                      changeHidden(fe_id, !isHidden);
                    }}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={isLocked ? styles.btn : ""}
                    icon={<LockOutlined />}
                    type={isLocked ? "primary" : "text"}
                    onClick={() => {
                      changeLocked(fe_id);
                    }}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        );
      })}
    </SortableContainer>
  );
};

export default Layers;

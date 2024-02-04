import React, { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditHeader.module.scss";
import { EditOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Input, Space, Typography } from "antd";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../store/pageInfoReducer";

const { Title } = Typography;

const TitleElem: FC = () => {
  const dispatch = useDispatch();
  const [editState, setEditState] = useState(false);
  const { title } = useGetPageInfo();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    dispatch(changePageTitle(newTitle));
  }

  if (editState)
    return (
      <Input
        value={title}
        onChange={handleChange}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
      />
    );
  else
    return (
      <Space>
        <Title>{title}</Title>
        <Button
          icon={<EditOutlined />}
          type="text"
          onClick={() => {
            setEditState(true);
          }}
        />
      </Space>
    );
};

const EditHeader: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;

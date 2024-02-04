import React, { ChangeEvent, FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditHeader.module.scss";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Space, Typography } from "antd";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changePageTitle } from "../../../store/pageInfoReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../services/question";

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

const SaveButton: FC = () => {
  const { id } = useParams();
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { componentList, pageInfo });
    },
    {
      manual: true
    }
  );

  useDebounceEffect(
    () => {
      save();
    },
    [componentList, pageInfo],
    { wait: 1000 }
  );

  useKeyPress(["ctrl.s", "meta.s"], (event) => {
    event.preventDefault();
    if (!loading) save();
  });

  return (
    <Button
      type="primary"
      loading={loading}
      onClick={() => {
        if (!loading) save();
      }}
      icon={loading ? <LoadingOutlined /> : null}
    >
      保存
    </Button>
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
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;

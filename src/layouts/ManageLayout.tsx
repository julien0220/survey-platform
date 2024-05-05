import React, { FC, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Space, Divider, message } from "antd";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { createQuestionService } from "../services/question";
import CreateSurveyAI from "../components/CreateSurveyAI";
import styles from "./ManageLayout.module.scss";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [createAIStatus, setCreateAIStatus] = useState(false);
  const [windowOpen, setWindowOpen] = useState(false);

  const { loading, run: handleCreateClick } = useRequest(
    createQuestionService,
    {
      manual: true,
      onSuccess: (data) => {
        nav(`/question/edit/${data.id || data._id}`);
        message.success("创建成功");
      }
    }
  );

  const handleCreateAIClick = () => {
    setCreateAIStatus(true);
    setWindowOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateAIClick}
            disabled={windowOpen}
          >
            AI 创建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav("/manage/list");
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav("/manage/star");
            }}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              nav("/manage/trash");
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
      <div className={styles.createAI}>
        {windowOpen && (
          <CreateSurveyAI value={windowOpen} onChange={setWindowOpen} />
        )}
      </div>
    </div>
  );
};

export default ManageLayout;

import React, { FC, useState } from "react";
import { useTitle, useRequest } from "ahooks";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Space,
  Button,
  message,
  Modal,
  Spin
} from "antd";
import ListSearch from "../../components/ListSearch";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import {
  deleteQuestionService,
  updateQuestionService
} from "../../services/question";
import ListPage from "../../components/ListPage";

import styles from "./Common.module.scss";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  useTitle("漫旅问卷 - 回收站");

  // const [questionList, setQuestionList] = useState(rawQuestionList);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 选中的问卷id, 泛型

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, // 其实和 disabled 的 loading 差不多
      onSuccess() {
        message.success("恢复成功");
        refresh();
        setSelectedIds([]);
      }
    }
  );

  // 删除
  const { run: deleteQuestion } = useRequest(
    async () => await deleteQuestionService(selectedIds),
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success("删除成功");
        refresh();
        setSelectedIds([]);
      }
    }
  );

  const {
    data = {},
    loading,
    refresh
  } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title" // 循环列的key，它会默认取dataIndex的值
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      }
    },
    {
      title: "答卷数量",
      dataIndex: "answerCount"
    },
    {
      title: "创建时间",
      dataIndex: "createAt"
    }
  ];

  function del() {
    confirm({
      title: "确认删除吗？",
      icon: <ExclamationCircleOutlined />,
      content: "删除后将无法恢复",
      onOk: () => deleteQuestion()
    });
  }

  const TableElement = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button
            disabled={selectedIds.length === 0}
            type="primary"
            onClick={() => {
              recover();
            }}
          >
            恢复
          </Button>
          <Button
            disabled={selectedIds.length === 0}
            danger
            onClick={() => {
              del();
            }}
          >
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(
              `selectedRowKeys: ${selectedRowKeys}`, // 选中的行id
              `selectedRows: ${JSON.stringify(selectedRows)}` // 选中的行
            );
            setSelectedIds(selectedRowKeys as string[]);
            // console.log(selectedIds, JSON.stringify(selectedIds));
          }
        }}
        pagination={false}
        rowKey={(q) => q._id}
      />
    </>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          {/* <h3>搜索</h3> */}
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty />}
        {list.length !== 0 && TableElement}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />{" "}
      </div>
    </>
  );
};

export default Trash;

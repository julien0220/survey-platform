import React, { FC, useState } from "react";
import { useTitle } from "ahooks";
import { Typography, Empty, Table, Tag } from "antd";
import styles from "./Common.module.scss";
import { table } from "console";

const { Title } = Typography;

const rawQuestionList = [
  {
    _id: "q1", // 为了和 mongoDB 保持一致，使用 _id
    title: "问卷1",
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: "3月10日 13:43"
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createAt: "5月20日 17:23"
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: "6月1日 13:53"
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: "7月70日 13:13"
  }
];

const Trash: FC = () => {
  useTitle("漫旅问卷 - 回收站");

  const [questionList, setQuestionList] = useState(rawQuestionList);

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

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <h3>搜索</h3>
        </div>
      </div>
      <div className={styles.content}>
        {!questionList.length && <Empty />}
        {questionList.length && (
          <Table
            dataSource={questionList}
            columns={tableColumns}
            pagination={false}
            rowKey={(q) => q._id}
          />
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Trash;

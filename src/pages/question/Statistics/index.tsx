import React, { FC, useState } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { useTitle } from "ahooks";
import { useNavigate } from "react-router-dom";
import { Button, Result, Spin } from "antd";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import StatHeader from "./StatHeader";
import PageStat from "./PageStat";
import styles from "./index.module.scss";
import ComponentList from "./ComponentList";

const Statistics: FC = () => {
  const nav = useNavigate();
  const { loading } = useLoadQuestionData();
  const { isPublished, title } = useGetPageInfo();

  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponentType, setSelectedComponentType] = useState("");

  useTitle(`问卷统计 - ${title}`);

  const LoadingElem = (
    <div style={{ textAlign: "center" }}>
      <Spin />
    </div>
  );

  function genContentElem() {
    if (typeof isPublished === "boolean" && !isPublished) {
      return (
        <div style={{ flex: "1" }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button
                type="primary"
                onClick={() => {
                  nav(-1);
                }}
              >
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.right}>右侧</div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles[".content-wrapper"]}>
        {loading && LoadingElem}

        {!loading && <div className={styles.content}> {genContentElem()} </div>}
      </div>
    </div>
  );
};

export default Statistics;

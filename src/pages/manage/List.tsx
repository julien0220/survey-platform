import React, { FC, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionCard from "../../components/QuestionCard";
import { Typography, Spin } from "antd";
import ListSearch from "../../components/ListSearch";
import styles from "./Common.module.scss";
import { useTitle, useDebounceFn, useRequest } from "ahooks";
import { getQuestionListService } from "../../services/question";
import { LISt_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography;

const List: FC = () => {
  useTitle("漫旅问卷 - 我的问卷");

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams(); // url 参数,没有 page 和 pageSize 参数,但是有 keyword

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LISt_PAGE_SIZE,
        keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || ""
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      }
    }
  );

  // 页面初始化、url参数(keyword)变化时
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 考虑防抖,尝试加载更多
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      // 判断最底下的元素露出了,才加载更多
      const elem = containerRef.current;
      if (elem === null) return;

      const domRect = elem.getBoundingClientRect();
      if (domRect === null) return;

      const { bottom } = domRect;
      if (bottom <= document.documentElement.clientHeight) {
        // 加载更多
        load();
      }
    },
    { wait: 1000 }
  );

  // 页面滚动时出发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }

    return () => {
      window.removeEventListener("scroll", tryLoadMore); // 组件卸载时,移除监听(必须做)
    };
  }, [searchParams, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          {/* <h3>搜索</h3> */}
          <ListSearch />
        </div>
      </div>
      {/* <div style={{ height: "2000px" }}></div> */}
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>load more...... 上划加载更多......</div>
      </div>
    </>
  );
};

export default List;

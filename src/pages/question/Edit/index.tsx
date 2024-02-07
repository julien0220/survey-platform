import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import { useTitle } from "ahooks";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectedId } from "../../../store/componentsReducer";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import LeftPanel from "./leftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  const { title } = useGetPageInfo();

  useTitle(`问卷编辑 - ${title}`);

  function clearSelectedId() {
    dispatch(changeSelectedId(""));
  }

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles["canvas-wrapper"]}>
              {/* <div style={{ height: "900px" }}>画布，测试滚动</div> */}
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionService } from "../services/question";
import { resetComponents } from "../store/componentsReducer";

function useLoadQuestionData() {
  const dispatch = useDispatch();
  const { id = "" } = useParams(); // 解析获取路由动态参数

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷 id");
      return getQuestionService(id);
    },
    {
      manual: true
    }
  );

  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return;

    const { title = "", componentList = [] } = data;

    const selectedId = componentList.length > 0 ? componentList[0].fe_id : ""; // 默认选中第一个组件

    // 把 componentList 里面的组件信息存到 redux store 里面
    dispatch(resetComponents({ componentList, selectedId: selectedId }));
  }, [data]);

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
}

export default useLoadQuestionData;

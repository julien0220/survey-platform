import { useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getQuestionListService } from "../services/question";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

function useLoadQuestionData() {
  const [searchParams] = useSearchParams();
  console.log("keyword", searchParams.get("page"));

  const { data, loading, error } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

      const data = await getQuestionListService({ keyword });
      return data;
    },
    {
      refreshDeps: [searchParams]
    }
  );

  return { data, loading, error };
}

export default useLoadQuestionData;

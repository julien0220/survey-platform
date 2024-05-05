import axios, { ResDataType } from "./ajax";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  // isPublished
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

type HistoryItem = {
  userMsg: string;
  assistantMsg: string;
};

type ChatHistory = HistoryItem[];

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// 查询问卷列表
export async function getQuestionListService(
  opt: Partial<SearchOption>
): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

// 更新单个问卷
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, opt)) as ResDataType;
  return data;
}

// 复制问卷
export async function duplicateQuestionService(
  id: string
): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

// 批量彻底删除
export async function deleteQuestionService(
  ids: string[]
): Promise<ResDataType> {
  const url = `/api/question`;
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType;
  return data;
}

// ai
export async function getCreateQuestionAiService({
  text,
  history,
  onMessage
}: {
  text: string;
  history: ChatHistory;
  onMessage: (msg: string) => void;
}): Promise<ResDataType> {
  const url = `/api/question/getAiInfo`;
  const data = (await axios.post(
    url,
    {
      text,
      history,
      onMessage
    },
    { timeout: 90000 }
  )) as ResDataType;
  return data;
}

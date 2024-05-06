// 存储常量

export const LIST_SEARCH_PARAM_KEY = "keyword";
export const LIST_PAGE_PARAM_KEY = "page";
export const LIST_PAGE_SIZE_PARAM_KEY = "pageSize";
export const LISt_PAGE_SIZE = 10;
export const STAT_COLORS = [
  "#FF6F61", // 红色
  "#4CAF50", // 绿色
  "#2196F3", // 蓝色
  "#FFC107", // 黄色
  "#9C27B0", // 紫色
  "#FF5722", // 橙色
  "#607D8B", // 灰色
  "#00BCD4" // 青色
];

export interface AISurveyType {
  title: string;
  info: string;
  radio: { title: string; options: string[] }[];
  checkbox: { title: string; options: string[] }[];
}

export interface SurveyItem {
  fe_id: string;
  id: number;
  title: any;
  desc: any;
}

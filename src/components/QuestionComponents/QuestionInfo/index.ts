import Component from "./Component";
import { QuestionInfoDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "问卷信息",
  type: "questionInfo", // 要和后端统一好
  PropComponent,
  Component,
  defaultProps: QuestionInfoDefaultProps
};

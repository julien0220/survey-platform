import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionInput", // 要和后端统一好
  PropComponent,
  Component,
  defaultProps: QuestionInputDefaultProps
};

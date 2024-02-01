import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "标题",
  type: "questionTitle", // 要和后端统一好
  PropComponent,
  Component,
  defaultProps: QuestionTitleDefaultProps
};

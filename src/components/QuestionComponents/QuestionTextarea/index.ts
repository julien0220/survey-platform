import Component from "./Component";
import { QuestionTextareaDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionTextarea", // 要和后端统一好
  PropComponent,
  Component,
  defaultProps: QuestionTextareaDefaultProps
};

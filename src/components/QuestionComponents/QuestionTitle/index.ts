import Component from "./Component";
import { QuestionTitleDefaultProps } from "./interface";
import Propcomponent from "./PropComponent";

export * from "./interface";

export default {
  title: "标题",
  type: "questionTitle", // 要和后端统一好
  Propcomponent,
  Component,
  defaultProps: QuestionTitleDefaultProps
};

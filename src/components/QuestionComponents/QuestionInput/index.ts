import Component from "./Component";
import { QuestionInputDefaultProps } from "./interface";
import Propcomponent from "./PropComponent";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionInput", // 要和后端统一好
  Propcomponent,
  Component,
  defaultProps: QuestionInputDefaultProps
};

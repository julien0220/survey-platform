import Component from "./Component";
import { QuestionCheckboxDefaultProps } from "./interface";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "多选",
  type: "questionCheckbox", // 要和后端统一好
  PropComponent,
  Component,
  defaultProps: QuestionCheckboxDefaultProps
};

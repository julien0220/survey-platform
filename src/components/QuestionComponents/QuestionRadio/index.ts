import Component from "./Component";
import { QuestionRadioDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
  title: "单选",
  type: "questionRadio", // 要和后端统一好
  PropComponent,
  Component,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent
};

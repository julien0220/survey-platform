// 定义组件需要的数据类型以及默认类型

export type QuestionTitlePropsType = {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  isCenter?: boolean;
};

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: "一行标题",
  level: 1,
  isCenter: false
};

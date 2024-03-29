export type QuestionParagraphPropsType = {
  text?: string;
  isCenter?: boolean;

  onChange?: (newProps: QuestionParagraphPropsType) => void;
  disabled?: boolean;
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: "一个段落",
  isCenter: false
};

import React, { FC } from "react";
import { Radio, Space } from "antd";
import { Typography } from "antd";
import { QuestionRadioPropsType, QuestionRadioDefaultProps } from "./interface";

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const {
    title,
    isVertical,
    options = [],
    value
  } = {
    ...QuestionRadioDefaultProps,
    ...props
  };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? "vertical" : "horizontal"}>
          {options.map((opt) => {
            const { value, text } = opt;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;

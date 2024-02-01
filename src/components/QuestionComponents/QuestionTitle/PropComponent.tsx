import React, { FC, useEffect } from "react";
import { Form, Input, Checkbox, Select } from "antd";
import { QuestionTitlePropsType } from "../QuestionTitle";

const PropComponent: FC<QuestionTitlePropsType> = (
  props: QuestionTitlePropsType
) => {
  const { text, level, isCenter, onChange } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);

  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: "请输入标题内容" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 }
          ]}
        ></Select>
      </Form.Item>
      <Form.Item valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
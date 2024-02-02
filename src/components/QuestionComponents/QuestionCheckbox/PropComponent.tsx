import React, { FC, useEffect } from "react";
import { Form, Input, Checkbox, Select, Button, Space } from "antd";
import { QuestionCheckboxPropsType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { OptionType } from "./interface";
import { nanoid } from "@reduxjs/toolkit";

const PropComponent: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const { title, isVertical, list = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange) {
      const newValues = form.getFieldsValue();
      const { list = [] } = newValues as QuestionCheckboxPropsType;
      list.forEach((opt) => {
        if (opt.value) return;
        opt.value = nanoid(5);
      });

      onChange(newValues);
    }
  }

  // useEffect(() => {
  //   form.setFieldsValue({ title, isVertical, value, options });
  // }, [title, isVertical, value, options]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;

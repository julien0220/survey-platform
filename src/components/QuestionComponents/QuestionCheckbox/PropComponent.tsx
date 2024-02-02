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
      const { list = [] } = newValues as QuestionCheckboxPropsType; // as 写上一行也可以
      list.forEach((opt) => {
        if (opt.value) return;
        opt.value = nanoid(5);
      });

      onChange(newValues);
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list });
  }, [title, isVertical, list]);

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
      {}
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/*遍历所有选项，可删除*/}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/*当前选项是否选中*/}
                    <Form.Item name={[name, "checked"]} valuePropName="checked">
                      {/*Checkbox 组件没有value属性,用valuePropName="checked"代替*/}
                      <Checkbox />
                    </Form.Item>
                    {/*当前选项 输入框*/}
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue();
                            let num = 0;
                            list.forEach((item: OptionType) => {
                              if (item.text === text) num++;
                            });
                            return num === 1
                              ? Promise.resolve()
                              : Promise.reject("和其他选项重复了");
                          }
                        }
                      ]}
                    >
                      <Input placeholder="输入选项文字..."></Input>
                    </Form.Item>
                    {/*删除*/}
                    {index >= 1 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}

              {/*添加选项*/}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "", checked: false })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      {}

      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;

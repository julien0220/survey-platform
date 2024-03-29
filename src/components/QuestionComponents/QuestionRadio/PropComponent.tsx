import React, { FC, useEffect } from "react";
import { Form, Input, Checkbox, Select, Button, Space } from "antd";
import { QuestionRadioPropsType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { OptionType } from "./interface";
import { nanoid } from "@reduxjs/toolkit";

const PropComponent: FC<QuestionRadioPropsType> = (
  props: QuestionRadioPropsType
) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange) {
      const newValues = form.getFieldsValue();
      const { options = [] } = newValues as QuestionRadioPropsType;
      options.forEach((opt) => {
        if (opt.value) return;
        opt.value = nanoid(5);
      });

      onChange(newValues);
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
  }, [title, isVertical, value, options]);

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
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
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/*遍历所有选项，可删除*/}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, "text"]}
                      rules={[
                        { required: true, message: "请输入选项文字" },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue();
                            let num = 0;
                            options.forEach((option: OptionType) => {
                              if (option.text === text) num++;
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
                    {index >= 2 && (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                );
              })}

              {/*添加选项*/}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: "", value: "" })}
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
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options?.map(({ text, value }) => ({
            value,
            label: text || ""
          }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;

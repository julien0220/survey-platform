import React, { FC } from "react";
import { Typography, Space, Form, Input, Button, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { useRequest } from "ahooks";
import { registerService } from "../services/user";
import styles from "./Register.module.scss";

const { Title } = Typography;

const Register: FC = () => {
  const nav = useNavigate();
  const { run } = useRequest(
    async (values) => {
      const { username, password, nickname } = values;
      return await registerService(username, password, nickname);
    },
    {
      manual: true,
      onSuccess() {
        message.success("注册成功");
        nav(LOGIN_PATHNAME);
      }
    }
  );

  const onFinish = (values: any) => {
    // any 在适合的情况下写，不要都用
    run(values);
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form
          style={{ marginRight: "26px" }}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: "请输入用户名" },
              {
                type: "string",
                min: 5,
                max: 20,
                message: "用户名长度为5-20位"
              },
              {
                pattern: /^\w+$/,
                message: "用户名只能包含字母、数字、下划线"
              }
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="ConfirmPassword"
            // style={{ paddingRight: "-20px" }}
            dependencies={["password"]} // 依赖password，只要password变化，就会触发验证
            rules={[
              { required: true, message: "请输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  } else
                    return Promise.reject(new Error("两次输入的密码不一致"));
                }
              })
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input></Input>
          </Form.Item>
          <Form.Item
            style={{ marginLeft: "16px" }}
            wrapperCol={{ span: 16, offset: 6 }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有帐户，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;

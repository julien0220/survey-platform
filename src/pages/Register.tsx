import React, { FC } from "react";
import { Typography, Space, Form, Input, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import styles from "./Register.module.scss";

const { Title } = Typography;

const Register: FC = () => {
  const onFinish = (values: any) => {
    // any 在适合的情况下写，不要都用
    console.log(values);
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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label="用户名" name="username">
            <Input></Input>
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label="确认密码" name="ConfirmPassword">
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16, offset: 6 }}>
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

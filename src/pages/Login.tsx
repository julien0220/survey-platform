import React, { FC, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Space,
  Form,
  Input,
  Button,
  Checkbox,
  message
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router";
import { loginService } from "../services/user";
import styles from "./Login.module.scss";
import { useRequest } from "ahooks";
import { loginReducer } from "../store/userReducer";
import { setToken } from "../utils/user-token";

const { Title } = Typography;

const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  };
}

const Login: FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    const { username, password } = getUserFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  // 登录服务
  const { run } = useRequest(
    async (username, password) => {
      // const { username, password } = form.getFieldsValue();
      // const { username, password } = values;
      return await loginService(username, password);
    },
    {
      manual: true,
      onSuccess(result) {
        const { token } = result.data || {};
        // 存储 token
        setToken(token);

        dispatch(
          loginReducer({
            username: result.username,
            nickname: result.data?.nickname
          })
        );
        nav(MANAGE_INDEX_PATHNAME);
        message.success("登录成功");
      }
    }
  );

  const onFinish = (values: any) => {
    // any 在适合的情况下写，不要都用
    // console.log(values);
    const { username, password, remember } = values || {};
    run(username, password);
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
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
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

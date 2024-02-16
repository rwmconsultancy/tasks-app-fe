import React from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Typography,
  Checkbox,
  message,
  Skeleton,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import cookies from "js-cookie";

const { Title, Link, Text } = Typography;

function AuthPage() {
  const onFinish = (values) => {
    // console.log("Success:", values);
    loginUser(values);
  };

  const handleRegister = () => {
    console.log("register");
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  async function loginUser(input) {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          email: input.email,
          password: input.password,
        }
      );
      // console.log(response.data);
      message.success(response.data.message);
      await cookies.set("token", response.data.token, {
        expires: 1,
        secure: true,
      });
      // This redirect is a super ugly solution. Tried with useNavigate (router-dom) but no success. Need some reviewing.
      window.location.href = "/dashboard";
    } catch (e) {
      // console.log(e.response.data.message);
      message.error(e.response.data.message);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>
            <Skeleton.Image
              style={{
                width: 350,
                height: 150,
              }}
            />
          </Title>
        </div>
        <Title level={4}>Please sign in</Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
            <br />
            <br />
            <Text>
              Don't have an account?{" "}
              <Link href="" onClick={handleRegister}>
                Sign up!
              </Link>
            </Text>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AuthPage;

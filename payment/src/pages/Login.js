import React from "react";
import { Form, Input, Button, Card, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/", values, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.token;
      localStorage.setItem("authToken", token); 

      notification.success({
        message: "Login Successful",
        description: "You are now logged in!",
      });

      onLogin?.();
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: error.response?.data?.non_field_errors?.[0] || "Invalid credentials",
      });
    }
  };

  return (
    <Card title="Login" style={{ width: 350, margin: "auto", marginTop: 50 }}>
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </Card>
  );
};

export default Login;
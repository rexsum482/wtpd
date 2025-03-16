import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const signupResponse = await axios.post("http://127.0.0.1:8000/api/users/", values, {
        headers: { "Content-Type": "application/json" },
      });

      if (signupResponse.status !== 201) {
        throw new Error("User registration failed!");
      }

      message.success("User registered successfully! Logging in...");

      const loginResponse = await axios.post("http://127.0.0.1:8000/auth/", values, {
        headers: { "Content-Type": "application/json" },
      });

      const token = loginResponse.data.token;
      localStorage.setItem("authToken", token);

      message.success("Signup successful! Redirecting...");
      onSignup?.();
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      message.error(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <Card title="Sign Up" style={{ width: 350, margin: "auto", marginTop: 50 }}>
      <Form name="signup" onFinish={onFinish} layout="vertical">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Create a username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter a password!" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </Card>
  );
};

export default Signup;
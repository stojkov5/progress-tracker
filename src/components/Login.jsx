import { useContext, useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        const success = login(values.username, values.password);
        if (success) {
          message.success("Login successful!");
          navigate("/"); 
        } else {
          message.error("Invalid username or password");
        }
        setLoading(false);
      }, 1000);
    },
  });

  return (
    <Card style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Form layout="vertical" onFinish={formik.handleSubmit}>
        <Form.Item label="Username" help={formik.touched.username && formik.errors.username}>
          <Input name="username" onChange={formik.handleChange} value={formik.values.username} />
        </Form.Item>

        <Form.Item label="Password" help={formik.touched.password && formik.errors.password}>
          <Input.Password name="password" onChange={formik.handleChange} value={formik.values.password} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;

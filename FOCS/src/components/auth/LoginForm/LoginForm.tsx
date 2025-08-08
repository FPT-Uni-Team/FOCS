import React from "react";
import {
  Form,
  Input,
  Button,
  Alert,
  Card,
  type FormInstance,
  Space,
  Typography,
} from "antd";
import styles from "./LoginForm.module.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  loading: boolean;
  error: string | null;
  form?: FormInstance;
  onSubmit: () => void;
}

const { Text } = Typography;

const LoginForm: React.FC<LoginFormProps> = ({
  loading,
  error,
  onSubmit,
  form,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={styles.loginFormContainer}>
      <Card title={t("signIn.welcome")} className={styles.loginCard}>
        <Form layout="vertical" onFinish={onSubmit} form={form}>
          <div className={styles.formFields}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t("signIn.required_email") },
                { type: "email", message: t("signIn.invalid_email") },
              ]}
            >
              <Input
                type="email"
                placeholder={t("signIn.enter_email")}
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: t("signIn.required_password") },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: t("signIn.password_pattern"),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t("signIn.enter_password")}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}
              className={styles.loginButton}
            >
              {loading ? t("signIn.logging_in") : t("signIn.login")}
            </Button>
          </Form.Item>
          {error && <Alert message={error} type="error" showIcon />}
        </Form>
        <Space
          direction="vertical"
          className={styles.footerContainer}
          align="center"
        >
          <Text type="secondary" className={styles.textSmall}>
            {t("signIn.do_not_account")}{" "}
            <Text
              className={styles.linkText}
              onClick={() => navigate("/register")}
            >
              {t("signIn.sign_up")}
            </Text>
          </Text>
          <Text
            className={styles.forgotLink}
            onClick={() => navigate("/forgotpassword")}
          >
            {t("signIn.forgot_password")}
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default LoginForm;

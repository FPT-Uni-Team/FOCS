import React from "react";
import { Form, Input, Button, Alert, Card, Typography, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.scss";

const { Text, Title } = Typography;

interface SignUpFormProps {
  isPending: boolean;
  isSuccess: boolean;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (values: any) => void;
}

const RegisterForm: React.FC<SignUpFormProps> = ({
  isPending,
  isSuccess,
  error,
  onFinish,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <Card className={styles.card}>
          <Title level={2} className={styles.successTitle}>
            🎉 {t("sign_up.check_email_title")}
          </Title>
          <Text className={styles.successText}>
            {t("sign_up.check_email_description")}
          </Text>
          <Button
            type="primary"
            block
            onClick={() => form.resetFields()}
            className={styles.button}
          >
            {t("sign_up.go_to_sign_in")}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Card title={t("sign_up.title")} className={styles.card}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Space
            direction="horizontal"
            style={{ width: "100%", display: "flex" }}
          >
            <Form.Item
              name="first_name"
              label={t("sign_up.first_name")}
              rules={[{ required: true, message: t("error_required") }]}
              className={styles.item}
              required={false}
            >
              <Input
                placeholder={t("sign_up.first_name_placeholder")}
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="last_name"
              label={t("sign_up.last_name")}
              rules={[{ required: true, message: t("error_required") }]}
              className={styles.item}
              required={false}
            >
              <Input
                placeholder={t("sign_up.last_name_placeholder")}
                prefix={<UserOutlined />}
              />
            </Form.Item>
          </Space>

          <Form.Item
            name="email"
            label={t("sign_up.email")}
            rules={[
              { required: true, message: t("error_required") },
              { type: "email", message: t("error_email_invalid") },
            ]}
            required={false}
          >
            <Input
              placeholder={t("sign_up.email_placeholder")}
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label={t("sign_up.phone")}
            rules={[
              { required: true, message: t("error_required") },
              {
                pattern: /^[0-9]{9,11}$/,
                message: t("error_phone_invalid"),
              },
            ]}
            required={false}
          >
            <Input
              placeholder={t("sign_up.phone_placeholder")}
              prefix={<PhoneOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("sign_up.password")}
            rules={[
              { required: true, message: t("error_required") },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                message: t("error_password_combined"),
              },
            ]}
            required={false}
          >
            <Input.Password
              placeholder={t("sign_up.password_placeholder")}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label={t("sign_up.confirm_password")}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: t("error_required"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("error_password_not_match"))
                  );
                },
              }),
            ]}
            required={false}
          >
            <Input.Password
              placeholder={t("sign_up.confirm_password_placeholder")}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: "16px" }}
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isPending}
              disabled={isPending}
            >
              {t("sign_up.submit")}
            </Button>
          </Form.Item>

          <div className={styles.footer}>
            <Text>
              {t("sign_up.already_have_account")}{" "}
              <span onClick={() => navigate("/login")} className={styles.link}>
                {t("sign_up.sign_in")}
              </span>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;

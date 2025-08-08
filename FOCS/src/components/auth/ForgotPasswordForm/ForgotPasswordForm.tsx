import React from "react";
import { Form, Input, Button, Alert, Card, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordForm.module.scss";

const { Title, Text } = Typography;

interface ForgotPasswordFormProps {
  onSubmit: (values: { email: string }) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: string | null;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  isPending,
  isSuccess,
  error,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = (values: { email: string }) => {
    onSubmit(values);
  };

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <Card className={styles.card}>
          <Title level={2} className={styles.successTitle}>
            🎉 {t("forgot_password.check_email_title")}
          </Title>
          <Text className={styles.successText}>
            {t("forgot_password.check_email_description")}
          </Text>
          <Button
            type="primary"
            block
            onClick={() => navigate("/sign-in")}
            className={styles.button}
          >
            {t("forgot_password.go_to_sign_in")}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Card title={t("forgot_password.title")} className={styles.card}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="email"
            label={t("forgot_password.email")}
            rules={[
              { required: true, message: t("error_required") },
              { type: "email", message: t("error_email_invalid") },
            ]}
            required={false}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={t("forgot_password.email_placeholder")}
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
              {t("forgot_password.submit")}
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

export default ForgotPasswordForm;

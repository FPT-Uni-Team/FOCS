import React from "react";
import { Form, Input, Button, Alert, Card } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styles from "./ResetPasswordForm.module.scss";

interface ResetPasswordFormProps {
  email: string;
  isPending: boolean;
  error: string | null;
  onFinish: (values: {
    new_password: string;
    confirm_password: string;
  }) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  email,
  isPending,
  error,
  onFinish,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <div className={styles.container}>
      <Card title={t("reset_password.title")} className={styles.card}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label={t("reset_password.email")}>
            <Input
              type="email"
              value={email}
              disabled
              className={styles.disabledInput}
            />
          </Form.Item>

          <Form.Item
            name="new_password"
            required={false}
            label={t("reset_password.new_password")}
            rules={[
              { required: true, message: t("error_required") },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                message: t("error_password_combined"),
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="••••••••" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            label={t("reset_password.confirm_password")}
            dependencies={["new_password"]}
            hasFeedback
            required={false}
            rules={[
              { required: true, message: t("error_required") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("error_password_not_match"))
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••••" prefix={<LockOutlined />} />
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
              {t("reset_password.submit_reset")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;

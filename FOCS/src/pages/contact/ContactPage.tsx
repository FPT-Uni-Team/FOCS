import React from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import styles from "./ContactPage.module.scss";

const { Title, Paragraph } = Typography;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log("Submitted values:", values);
  };

  return (
    <div className={styles.contactPage}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className={styles.headerSection}
      >
        <Title level={2}>{t("home.contactTitle")}</Title>
        <Paragraph>{t("home.contactDescription")}</Paragraph>
      </motion.div>

      <Row gutter={32} justify={"center"} className={styles.formContainer}>
        <Col xs={24} md={12}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.formSection}
          >
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={t("home.contactNameLabel")}
                name="name"
                required={false}
                rules={[
                  { required: true, message: t("home.contactNameRequired") },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("home.contactEmailLabel")}
                name="email"
                required={false}
                rules={[
                  { required: true, message: t("home.contactEmailRequired") },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t("home.contactMessageLabel")}
                name="message"
                required={false}
                rules={[
                  { required: true, message: t("home.contactMessageRequired") },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                {t("home.contactSendButton")}
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={24} className={styles.infoSection}>
        {[
          {
            icon: <EnvironmentOutlined />,
            label: t("home.contactAddressLabel"),
            value: t("home.contactAddress"),
          },
          {
            icon: <MailOutlined />,
            label: "Email",
            value: "contact@yourcompany.com",
          },
          {
            icon: <PhoneOutlined />,
            label: t("home.contactPhoneLabel"),
            value: "+84 123 456 789",
          },
        ].map((item, idx) => (
          <Col xs={24} md={8} key={idx}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={styles.infoCard}
            >
              <div className={styles.infoIcon}>{item.icon}</div>
              <h4 className={styles.infoLabel}>{item.label}</h4>
              <Paragraph>{item.value}</Paragraph>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ContactPage;

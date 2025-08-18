import { Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styles from "./Homepage.module.scss";
import { TruckOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/brands");
  };

  return (
    <div className={styles.homePage}>
      <Row align="middle" justify="center" className={styles.heroSection}>
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title level={1} className={styles.mainTitle}>
              {t("home.introTitle")}
            </Title>
            <Paragraph className={styles.mainDescription}>
              {t("home.introDescription")}
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className={styles.ctaButton}
              onClick={handleStart}
            >
              {t("home.startButton")}
            </Button>
          </motion.div>
        </Col>

        <Col xs={24} md={12} className={styles.imageBlock}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={styles.heroIconWrapper}
          >
            <TruckOutlined className={styles.heroIcon} />
          </motion.div>
        </Col>
      </Row>

      <div className={styles.featuresSection}>
        <Title level={3}>{t("home.featureTitle")}</Title>
        <div className={styles.featureList}>
          {["feature1", "feature2", "feature3"].map((key, idx) => (
            <motion.div
              key={key}
              className={styles.featureItem}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <h4>{t(`home.${key}Title`)}</h4>
              <p>{t(`home.${key}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className={styles.detailSection}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title level={4}>{t("home.detailTitle")}</Title>
        <Paragraph>{t("home.detailDesc")}</Paragraph>
      </motion.div>

      <div className={styles.testimonialSection}>
        <Title level={3}>{t("home.testimonialTitle")}</Title>
        <div className={styles.testimonialList}>
          {["testimonial1", "testimonial2", "testimonial3"].map((key, idx) => (
            <motion.div
              key={key}
              className={styles.testimonialItem}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <Paragraph>“{t(`home.${key}`)}”</Paragraph>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className={styles.finalCtaSection}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Title level={4}>{t("home.finalCtaTitle")}</Title>
        <Button type="primary" size="large" onClick={handleStart}>
          {t("home.startButton")}
        </Button>
      </motion.div>
    </div>
  );
};

export default HomePage;

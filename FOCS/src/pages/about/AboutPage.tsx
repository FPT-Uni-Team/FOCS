import { Typography, Row, Col, Card } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { TeamOutlined, RocketOutlined, HeartOutlined, TrophyOutlined } from "@ant-design/icons";
import styles from "./AboutPage.module.scss";

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  const { t } = useTranslation();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <Title level={1} className={styles.heroTitle}>
            {t("about.heroTitle")}
          </Title>
          <Paragraph className={styles.heroDescription}>
            {t("about.heroDescription")}
          </Paragraph>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className={styles.missionSection}>
        <Row justify="center">
          <Col xs={24} lg={16}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Title level={2} className={styles.sectionTitle}>
                {t("about.missionTitle")}
              </Title>
              <Paragraph className={styles.missionText}>
                {t("about.missionDescription")}
              </Paragraph>
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* Values Section */}
      <div className={styles.valuesSection}>
        <Title level={2} className={styles.sectionTitle}>
          {t("about.valuesTitle")}
        </Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className={styles.valueCard}>
                <TeamOutlined className={styles.valueIcon} />
                <Title level={4}>{t("about.value1Title")}</Title>
                <Paragraph>{t("about.value1Description")}</Paragraph>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className={styles.valueCard}>
                <RocketOutlined className={styles.valueIcon} />
                <Title level={4}>{t("about.value2Title")}</Title>
                <Paragraph>{t("about.value2Description")}</Paragraph>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className={styles.valueCard}>
                <HeartOutlined className={styles.valueIcon} />
                <Title level={4}>{t("about.value3Title")}</Title>
                <Paragraph>{t("about.value3Description")}</Paragraph>
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className={styles.valueCard}>
                <TrophyOutlined className={styles.valueIcon} />
                <Title level={4}>{t("about.value4Title")}</Title>
                <Paragraph>{t("about.value4Description")}</Paragraph>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* Story Section */}
      <div className={styles.storySection}>
        <Row align="middle" gutter={[48, 48]}>
          <Col xs={24} lg={12}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Title level={2}>{t("about.storyTitle")}</Title>
              <Paragraph className={styles.storyText}>
                {t("about.storyDescription")}
              </Paragraph>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.storyImage}
            >
              <div className={styles.imagePlaceholder}>
                <TeamOutlined className={styles.placeholderIcon} />
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.ctaContent}
        >
          <Title level={2}>{t("about.ctaTitle")}</Title>
          <Paragraph className={styles.ctaDescription}>
            {t("about.ctaDescription")}
          </Paragraph>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;

import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./HomePage.module.scss";

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/brands");
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.introSection}>
        <div className={styles.leftBlock}>
          <Title level={2}>{t("home.introTitle")}</Title>
          <Paragraph>{t("home.introDescription")}</Paragraph>
        </div>

        <div className={styles.rightBlock}>
          <Title level={4}>{t("home.readyTitle")}</Title>
          <Paragraph>{t("home.readyDescription")}</Paragraph>
          <Button size="large" onClick={handleStart}>
            {t("home.startButton")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

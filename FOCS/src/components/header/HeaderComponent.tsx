import React from "react";
import { Layout, Select } from "antd";
import styles from "./HeaderComponent.module.scss";
import { TruckOutlined } from "@ant-design/icons";
import MenuUser from "../auth/MenuUser/MenuUser";
import { useTranslation } from "react-i18next";
import { getHeaderRouter } from "../../routes/HeaderRouter";
import i18n from "../../i18n";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export const HeaderComponent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.left}>
        <TruckOutlined
          className={styles.logoIcon}
          size={28}
          onClick={() => navigate("/")}
        />
      </div>

      <div className={styles.center}>
        {getHeaderRouter(t).map(
          (item: { key: string; label: string; href: string }) => (
            <span
              key={item.key}
              className={styles.navLink}
              onClick={() => navigate(item.href)}
            >
              {t(item.label)}
            </span>
          )
        )}
      </div>

      <div className={styles.right}>
        <Select
          defaultValue={i18n.language || "en"}
          onChange={handleChangeLanguage}
          style={{ marginRight: 16 }}
          options={[
            {
              value: "en",
              label: <span>🇺🇸 EN</span>,
            },
            {
              value: "vi",
              label: <span>🇻🇳 VI</span>,
            },
          ]}
        />
        <MenuUser />
      </div>
    </Header>
  );
};

import React from "react";
import { Layout } from "antd";
import styles from "./HeaderComponent.module.scss";
import { TruckOutlined } from "@ant-design/icons";
import MenuUser from "../auth/MenuUser/MenuUser";
import { useTranslation } from "react-i18next";
import { getHeaderRouter } from "../../routes/HeaderRouter";

const { Header } = Layout;

export const HeaderComponent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Header className={styles.header}>
      <div className={styles.left}>
        <TruckOutlined className={styles.logoIcon} size={28} />
      </div>
      <div className={styles.center}>
        {getHeaderRouter(t).map(
          (item: { key: string; label: string; href: string }) => (
            <a key={item.key} href={item.href} className={styles.navLink}>
              {t(item.label)}
            </a>
          )
        )}
      </div>

      <div className={styles.right}>
        <MenuUser />
      </div>
    </Header>
  );
};

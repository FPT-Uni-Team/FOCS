import React from "react";
import { Layout } from "antd";
import styles from "./FooterComponent.module.scss";

const { Footer } = Layout;

export const FooterComponent: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      ©{new Date().getFullYear()} FOCS. All rights reserved.
    </Footer>
  );
};

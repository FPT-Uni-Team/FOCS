import { Layout } from "antd";
import styles from "./MainLayout.module.scss";
import { HeaderComponent } from "../components/header/HeaderComponent";
import { FooterComponent } from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const MainLayout = () => {
  return (
    <Layout className={styles.mainLayout}>
      <HeaderComponent />
      <Content className={styles.mainContent}>
        <Outlet />
      </Content>
      <FooterComponent />
    </Layout>
  );
};

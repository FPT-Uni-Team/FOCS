import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "./FallBack.module.scss";

const FallBack = () => {
  return (
    <div className={styles.customLayout}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};
export default FallBack;

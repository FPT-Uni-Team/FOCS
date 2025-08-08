import { Avatar, Dropdown, type MenuProps } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import styles from "./MenuUser.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import { parseJwt } from "../../../helper/parseJWT";

const MenuUser = () => {
  const { isLoggedIn, getAccessToken, logout } = useAuth();

  if (!isLoggedIn) {
    return (
      <div
        className={styles.loginIcon}
        onClick={() => (window.location.href = "/login")}
      >
        <LoginOutlined style={{ fontSize: 20, cursor: "pointer" }} />
      </div>
    );
  }

  const userInfo = parseJwt(getAccessToken() || "");
  const name = userInfo?.name || "User";

  const items: MenuProps["items"] = [
    {
      key: "username",
      label: <>👤 {name}</>,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "🚪 Logout",
      onClick: logout,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      className={styles.customDropdown}
      trigger={["click"]}
    >
      <Avatar shape="circle">{name.charAt(0)}</Avatar>
    </Dropdown>
  );
};

export default MenuUser;

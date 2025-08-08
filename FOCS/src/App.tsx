import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { notification } from "antd";
import { setNotificationApi } from "./components/common/notification/ToastCustom";

function App() {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    setNotificationApi(api);
  }, [api]);
  return (
    <>
      {contextHolder}
      <AppRoutes />
    </>
  );
}

export default App;

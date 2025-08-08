import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routesConfig";
import FallBack from "../components/common/fallback/FallBack";

function AppRoutes() {
  const element = useRoutes(routes);
  return <Suspense fallback={<FallBack />}>{element}</Suspense>;
}

export default AppRoutes;

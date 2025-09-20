import { type RouteObject } from "react-router-dom";
import { lazy } from "react";
import { MainLayout } from "../layouts/MainLayout";

const Home = lazy(() => import("../pages/homepage/Homepage"));
const Login = lazy(() => import("../pages/login/LoginPage"));
const Register = lazy(() => import("../pages/register/RegisterPage"));
const ForgotPassword = lazy(
  () => import("../pages/forgotPassword/ForgotPasswordPage")
);
const ResetPassword = lazy(
  () => import("../pages/resetPassword/ResetPasswordPage")
);
const Brand = lazy(() => import("../pages/brand/BrandPage"));
const BrandDetail = lazy(() => import("../pages/brand/BrandDetailPage"));
const StoreDetail = lazy(() => import("../pages/store/StoreDetail"));
const ContactPage = lazy(() => import("../pages/contact/ContactPage"));
const AboutPage = lazy(() => import("../pages/about/AboutPage"));

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/brands",
        element: <Brand />,
      },
      {
        path: "/brands/:id",
        element: <BrandDetail />,
      },
      {
        path: "/stores/:id",
        element: <StoreDetail />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
];

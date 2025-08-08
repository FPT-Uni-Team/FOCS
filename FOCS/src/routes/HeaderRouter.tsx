import type { TFunction } from "i18next";

export const getHeaderRouter = (t: TFunction) => [
  {
    key: "home",
    label: t("header.home"),
    href: "/",
  },
  {
    key: "about",
    label: t("header.aboutUs"),
    href: "/about",
  },
  {
    key: "products",
    label: t("header.products"),
    href: "/products",
  },
  {
    key: "contact",
    label: t("header.contact"),
    href: "/contact",
  },
];

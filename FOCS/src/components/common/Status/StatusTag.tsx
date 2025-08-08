import React from "react";
import { Tag } from "antd";
import styles from "./StatusTag.module.scss";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface StatusTagProps {
  status: string;
}

const statusKeyMap: Record<string, string> = {
  ongoing: "status.ongoing",
  expired: "status.expired",
  notstart: "status.notStart",
  unavailable: "status.unavailable",
  upcoming: "status.upcoming",
  available: "status.available",
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const { t } = useTranslation();
  const normalized = status.replace(" ", "").toLowerCase();
  const statusKey = statusKeyMap[normalized];

  if (!statusKey) {
    return <Tag color="default">{status}</Tag>;
  }

  return (
    <Tag className={clsx(styles[normalized], styles["custom-tag"])}>
      {t(statusKey)}
    </Tag>
  );
};

export default StatusTag;

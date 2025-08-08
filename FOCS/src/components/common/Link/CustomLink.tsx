import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CustomLink.module.scss";

interface Props {
  title: string;
  href: string;
}

const CustomLink: FC<Props> = ({ title, href }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(href)} className={styles.customTile}>
      {title}
    </div>
  );
};

export default CustomLink;

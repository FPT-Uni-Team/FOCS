import type { ReactNode } from "react";

export interface RawMenuItem {
  label: string;
  key: string;
  icon?: ReactNode;
  children?: RawMenuItem[];
}

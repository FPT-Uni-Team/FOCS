import type { SelectProps } from "antd";

export interface SelectConfig {
  type: "select" | "input" | "date" | "rangePicker";
  name: string;
  key?: string;
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  mode?: "multiple" | "tags";
  options?: SelectProps["options"];
}

export interface FilterReuseProps {
  onFilter: (filters: Record<string, unknown>) => void;
  selectConfigs?: SelectConfig[];
  onSearch: (value: string) => void;
  isShowFilter?: boolean;
}

export interface ListPageParams {
  page: number;
  page_size: number;
  search_by?: string;
  search_value?: string;
  sort_by?: string;
  sort_order?: string;
  filters?: Record<string, string>;
}

export interface ListPageResponse {
  total_count: number;
  page_index: number;
  page_size: number;
  items: [];
}

export const defaultParams = (page_size = 10) => {
  return {
    page: 1,
    page_size,
    search_by: "",
    search_value: "",
    sort_by: "",
    sort_order: "",
    filters: {},
  };
};

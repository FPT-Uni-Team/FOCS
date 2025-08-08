export interface CategoryListDataType {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
}

export const StatusType = {
  Available: true,
  Unavailable: false,
} as const;

export type StatusType = (typeof StatusType)[keyof typeof StatusType];

export const statusOptionsCategory = [
  { value: "", label: "All Type" },
  ...Object.entries(StatusType).map(([key, value]) => {
    return {
      value: String(value),
      label: key,
    };
  }),
];

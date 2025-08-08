import type { CouponAdminDTO } from "../coupon/coupon";
import type { MenuListDataType } from "../menu/menu";

export const PromotionType = {
  Percentage: 0,
  FixedAmount: 1,
  BuyXGetY: 4,
  // FreeItem: 2,
  // FreeShipping: 3,
  // TimeBased: 5,
  // FirstTimeBuyer: 6,
  // Loyalty: 7,
} as const;

export const PromotionStatus = {
  UnAvailable: 0,
  NotStarted: 1,
  Ongoing: 2,
  Expired: 3,
} as const;

export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType];
export type PromotionStatus =
  (typeof PromotionStatus)[keyof typeof PromotionStatus];
export interface PromotionListDataType {
  promotionId: string;
  promotionName: string;
  promotionStartDate: string;
  promotionEndDate: string;
  promotionType: PromotionType;
  promotionStatus: string;
}

export const PromotionTypeLabel: Record<PromotionType, string> = {
  [PromotionType.Percentage]: "Percentage Discount",
  [PromotionType.FixedAmount]: "Fixed Amount Discount",
  [PromotionType.BuyXGetY]: "Buy X Get Y",
  // [PromotionType.FreeItem]: "Free Item",
  // [PromotionType.FreeShipping]: "Free Shipping",
  // [PromotionType.TimeBased]: "Time-Based Promotion",
  // [PromotionType.FirstTimeBuyer]: "First Time Buyer",
  // [PromotionType.Loyalty]: "Loyalty Promotion",
};

export const promotionTypeOptions = [
  { value: "", label: "All Type" },
  ...Object.keys(PromotionTypeLabel).map((key) => ({
    value: key,
    label:
      PromotionTypeLabel[key as unknown as keyof typeof PromotionTypeLabel],
  })),
];

export const PromotionStatusLabel: Record<PromotionStatus, string> = {
  [PromotionStatus.UnAvailable]: "UnAvailable",
  [PromotionStatus.NotStarted]: "Not Start",
  [PromotionStatus.Ongoing]: "On Going",
  [PromotionStatus.Expired]: "Expired",
};

export const promotionStatusOptions = [
  { value: "", label: "All Status" },
  ...Object.keys(PromotionStatusLabel).map((key) => ({
    value: key,
    label:
      PromotionStatusLabel[key as unknown as keyof typeof PromotionStatusLabel],
  })),
];
export interface PromotionListParams {
  page: number;
  page_size: number;
  search_by?: string;
  search_value?: string;
  sort_by?: string;
  sort_order?: string;
  filters?: Record<string, string>;
}

export interface PromotionPayload {
  id?: string;
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  promotion_scope?: string;
  max_discount_value?: number;
  max_usage?: number;
  minimum_order_amount?: number;
  minimum_item_quantity?: number;
  can_apply_combine?: boolean;
  promotion_type?: number;
  discount_value?: number;
  is_active?: boolean;
  accept_for_items?: string[];
  accept_for_items_lists?: MenuListDataType[];
  promotion_item_condition?: {
    buy_item_id?: string;
    buy_item?: MenuListDataType;
    buy_quantity?: number;
    get_item_id?: string;
    get_item?: MenuListDataType;
    get_quantity?: number;
  };
  coupon_ids?: string[];
  coupon_lists?: CouponAdminDTO[];
  store_id?: string;
  status?: number;
}

export const promotionOptions = [
  {
    value: PromotionType.Percentage,
    label: PromotionTypeLabel[PromotionType.Percentage],
  },
  {
    value: PromotionType.FixedAmount,
    label: PromotionTypeLabel[PromotionType.FixedAmount],
  },
  {
    value: PromotionType.BuyXGetY,
    label: PromotionTypeLabel[PromotionType.BuyXGetY],
  },
];

export const promotionApplyOption = [
  {
    value: 0,
    label: "Item",
  },
  {
    value: 1,
    label: "Order",
  },
];

import type { MenuListDataType } from "../menu/menu";
import type { PromotionListDataType } from "../promotion/promotion";

export const CouponType = {
  Percentage: 0,
  FixedAmount: 1,
  FreeShipping: 2,
} as const;

export type CouponType = (typeof CouponType)[keyof typeof CouponType];

export const CouponTypeLabel: Record<CouponType, string> = {
  [CouponType.Percentage]: "Percentage Discount",
  [CouponType.FixedAmount]: "Fixed Amount Discount",
  [CouponType.FreeShipping]: "Free Shipping",
};

export const couponTypeOptions = [
  { value: "", label: "All Type" },
  ...Object.keys(CouponTypeLabel).map((key) => ({
    value: key,
    label: CouponTypeLabel[key as unknown as keyof typeof CouponTypeLabel],
  })),
];

export const CouponStatus = {
  UnAvailable: 0,
  NotStarted: 1,
  OnGoing: 2,
  Expired: 3,
} as const;

export type CouponStatus = (typeof CouponStatus)[keyof typeof CouponStatus];

export const CouponStatusLabel: Record<CouponStatus, string> = {
  [CouponStatus.UnAvailable]: "UnAvailable",
  [CouponStatus.NotStarted]: "Not Start",
  [CouponStatus.OnGoing]: "On Going",
  [CouponStatus.Expired]: "Expired",
};

export const couponStatusOptions = [
  { value: "", label: "All Type" },
  ...Object.keys(CouponStatusLabel).map((key) => ({
    value: key,
    label: CouponStatusLabel[key as unknown as keyof typeof CouponStatusLabel],
  })),
];

export const CouponCreationType = {
  Manual: 1,
  AutoGenerate: 0,
} as const;

export type CouponCreationType =
  (typeof CouponCreationType)[keyof typeof CouponCreationType];

export const CouponCreationTypeLabel: Record<CouponCreationType, string> = {
  [CouponCreationType.Manual]: "Manual Input Code",
  [CouponCreationType.AutoGenerate]: "Auto Generate Code",
};

export const couponCreationOptions = Object.values(CouponCreationType).map(
  (value) => ({
    value,
    label: CouponCreationTypeLabel[value],
  })
);

export const DiscountType = {
  Percent: 0,
  FixedAmount: 1,
} as const;

export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];

export const DiscountTypeLabel: Record<DiscountType, string> = {
  [DiscountType.Percent]: "Percentage Discount",
  [DiscountType.FixedAmount]: "Fixed Amount Discount",
};

export const discountTypeOptions = Object.values(DiscountType).map((value) => ({
  value,
  label: DiscountTypeLabel[value],
}));

export const CouponConditionType = {
  MinOrderAmount: 0,
  MinItemsQuantity: 1,
} as const;

export type CouponConditionType =
  (typeof CouponConditionType)[keyof typeof CouponConditionType];

export const CouponConditionTypeLabel: Record<CouponConditionType, string> = {
  [CouponConditionType.MinOrderAmount]: "Minimum order value",
  [CouponConditionType.MinItemsQuantity]: "Minimum items in cart",
};

export interface CouponConditionRequest {
  condition_type: CouponConditionType;
  value: number;
}

export const couponConditionOptions = Object.values(CouponConditionType).map(
  (value) => ({
    value,
    label: CouponConditionTypeLabel[value],
  })
);

// Main coupon creation request interface
export interface CouponCreateRequest {
  id?: string;
  code?: string;
  coupon_type: CouponCreationType;
  description: string;
  discount_type: DiscountType;
  value: number;
  start_date: string;
  end_date: string;
  status?: CouponStatus;
  max_usage?: number;
  count_used?: number;
  max_usage_per_user?: number;
  accept_for_items?: string;
  minimum_order_amount?: number;
  minimum_item_quantity?: number;
  is_active?: boolean;
  promotion_id?: string;
  store_id?: string;
  user_id?: string;
}

export interface CouponUpdateRequest {
  id?: string;
  code?: string;
  coupon_type: CouponCreationType;
  description: string;
  discount_type: DiscountType;
  value: number;
  start_date: string;
  end_date: string;
  status?: CouponStatus;
  max_usage: number;
  count_used: number;
  max_usage_per_user?: number;
  accept_for_items?: string;
  minimum_order_amount?: number;
  minimum_item_quantity?: number;
  is_active: boolean;
  promotion_id?: string;
}

export interface CouponListDataType {
  id: string;
  code: string;
  description: string;
  discount_type: CouponType;
  value: number;
  start_date: string;
  end_date: string;
  max_usage: number;
  count_used: number;
  is_active: boolean;
  status: CouponStatus;
}

export interface CouponListParams {
  page: number;
  page_size: number;
  search_by?: string;
  search_value?: string;
  sort_by?: string;
  sort_order?: string;
  filters?: Record<string, string>;
}

export interface CouponDetailType {
  id: string;
  code: string;
  coupon_type: number;
  description: string;
  discount_type: CouponType;
  value: number;
  start_date: string;
  end_date: string;
  max_usage: number;
  count_used: number;
  accept_for_items: [];
  accept_for_items_list: MenuListDataType[];
  minimum_order_amount: number;
  minimum_item_quantity: number;
  is_active: boolean;
  promotion_id: string;
  status: number;
  promotion?: PromotionListDataType[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface CouponAdminDTO {
  id: string;
  code: string;
  description: string;
  discount_type: CouponType;
  value: number;
  start_date: string;
  end_date: string;
  max_usage: number;
  count_used: number;
  is_active: boolean;
  status: CouponStatus;
}

export type CouponListResponse = PagedResult<CouponAdminDTO>;

export interface SetCouponStatusRequest {
  id: string;
  isActive: boolean;
}

export interface TrackCouponUsageResponse {
  totalLeft: number;
  leftPerUser?: number;
  couponId: string;
  currentUsage: number;
  maxUsage: number;
  maxUsagePerUser?: number;
  userUsage?: number;
}

export interface SetCouponStatusResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    isActive: boolean;
  };
}

// Coupon Assignment Types
export interface CouponAssignRequest {
  couponIds: string[];
  promotionId: string;
}

export interface CouponAssignResponse {
  success: boolean;
  message: string;
  data?: {
    promotionId: string;
    assignedCouponIds: string[];
    totalAssigned: number;
  };
}

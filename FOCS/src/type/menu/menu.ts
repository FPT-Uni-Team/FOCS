import type { CategoryListDataType } from "../category/category";
import type { VariantGroup } from "../variant/variant";

export interface MenuListDataType {
  menuId: string;
  menuName: string;
  menuDescription: string;
  menuBasePrice: number;
  isAvailable: boolean;
}

export const StatusType = {
  Available: true,
  Unavailable: false,
} as const;

export type StatusType = (typeof StatusType)[keyof typeof StatusType];

export const statusOptions = [
  { value: "", label: "All Type" },
  ...Object.entries(StatusType).map(([key, value]) => {
    return {
      value: String(value),
      label: key,
    };
  }),
];

export interface MenuItem {
  id?: string;
  name?: string;
  description?: string;
  images?: string | [];
  base_price?: number;
  is_available?: boolean;
  store_id?: string;
  category_ids?: [];
  categories?: CategoryListDataType[];
  variant_groups?: VariantGroup[];
}

export interface MenuItemCreatePayload {
  data: MenuItem;
  images: {
    images: [];
    mainImages: [];
  };
}

export interface BackendImage {
  url: string;
  id?: string;
  is_main: boolean;
}

export interface MenuItemUpdatePayload {
  data: MenuItem;
  images: {
    files: File[];
    metadata: ImageMetadata[];
  };
}

export interface ImageMetadata {
  id: string | null;
  is_main: boolean;
  is_deleted: boolean;
}

export interface ImageItem {
  id: string | null;
  url: string | null;
  file: File | null;
  preview: string;
  isMain: boolean;
  isDeleted: boolean;
  isNew: boolean;
}

export interface ImageUploaderGridRef {
  getImagesDataForUpload: () => { files: File[]; metadata: ImageMetadata[] };
  hasChanges: () => boolean;
}

export interface ImageUpdateGridProps {
  initialImages?: BackendImage[];
  onUploadAllClick?: (files: File[], metadata: ImageMetadata[]) => void;
  isUploadingImages?: boolean;
}

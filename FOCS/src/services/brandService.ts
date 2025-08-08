import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoint";
import type { ListPageParams } from "../type/common/common";

export interface BrandParams {
  id?: string;
  name: string;
  default_tax_rate: number;
  is_active: boolean;
}

const brandService = {
  getListBrand: (params: ListPageParams) =>
    axiosClient.post(endpoints.brand.list(), params),
  getDetailBrand: (params: string) =>
    axiosClient.get(endpoints.brand.detail(params)),
  createBrand: (params: BrandParams) =>
    axiosClient.post(endpoints.brand.create(), params),
  deleteBrand: (params: string) =>
    axiosClient.delete(endpoints.brand.delete(params)),
  updateBrand: (params: BrandParams) =>
    axiosClient.put(endpoints.brand.update(params.id as string), params),
};

export default brandService;

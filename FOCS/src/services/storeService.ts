import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoint";
import type { ListPageParams } from "../type/common/common";

export interface StoreParams {
  id: string;
  name: string;
  address: string;
  phone_number: string;
  custom_tax_rate: number;
  is_active: boolean;
  brand_id: string;
}

const storeService = {
  getListStore: (params: ListPageParams) =>
    axiosClient.post(endpoints.store.list(), params),
  getDetailStore: (params: string) =>
    axiosClient.get(endpoints.store.detail(params)),
  createStore: (params: StoreParams) =>
    axiosClient.post(endpoints.store.create(), params),
  deleteStore: (params: string) =>
    axiosClient.delete(endpoints.store.delete(params)),
  updateStore: (params: StoreParams) =>
    axiosClient.put(endpoints.store.update(params.id as string), params),
};

export default storeService;

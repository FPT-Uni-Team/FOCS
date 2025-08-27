import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoint";
import type { ListPageParams } from "../type/common/common";

export interface ManageParams {
  email: string;
  password: string;
  phone: string;
  first_name: string;
  last_name: string;
  confirm_password: string;
}

const manageService = {
  getListManage: (brandId: string, params: ListPageParams) =>
    axiosClient.post(endpoints.manage.list(brandId), params),
  createManage: (storeId: string, params: ManageParams) =>
    axiosClient.post(endpoints.manage.create(storeId), params),
};

export default manageService;

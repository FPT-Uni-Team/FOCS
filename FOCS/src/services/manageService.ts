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

export interface UpdateManageParams {
  id: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  roles: string[];
}

const manageService = {
  getListManage: (brandId: string, params: ListPageParams) =>
    axiosClient.post(endpoints.manage.list(brandId), params),
  createManage: (storeId: string, params: ManageParams) =>
    axiosClient.post(endpoints.manage.create(storeId), params),
  getListAllManage: (params: ListPageParams, storeId: string) =>
    axiosClient.post(endpoints.manage.listAll(), params, {
      headers: {
        'storeId': storeId
      }
    }),
  updateManage: (managerId: string, params: UpdateManageParams) =>
    axiosClient.put(endpoints.manage.update(managerId), params),
  deleteManage: (managerId: string) =>
    axiosClient.delete(endpoints.manage.delete(managerId)),
};

export default manageService;

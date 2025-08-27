import axiosClient from "../api/axiosClient";
import endpoints from "../api/endpoint";
import type { ListPageParams } from "../type/common/common";

const manageService = {
  getListManage: (brandId: string, params: ListPageParams) =>
    axiosClient.post(endpoints.manage.list(brandId), params),
};

export default manageService;

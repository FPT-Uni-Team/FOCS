import React, { useState } from "react";
import {
  Card,
  Switch,
  Descriptions,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Breadcrumb,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import storeService, { type StoreParams } from "../../services/storeService";
import manageService, { type UpdateManageParams } from "../../services/manageService";

import styles from "./StoreDetail.module.scss";
import FallBack from "../../components/common/fallback/FallBack";

const API_BASE_URL_ADMIN = import.meta.env.VITE_API_BASE_URL_ADMIN || "";
const StoreDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateManagerModalOpen, setIsUpdateManagerModalOpen] = useState(false);
  const [isDeleteManagerModalOpen, setIsDeleteManagerModalOpen] = useState(false);
  const [formUpdate] = Form.useForm();
  const [formUpdateManager] = Form.useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["storeDetail", id],
    queryFn: () => storeService.getDetailStore(id as string),
    enabled: !!id,
  });

  const { data: managerData, isLoading: isManagerLoading } = useQuery({
    queryKey: ["managerList", id],
    queryFn: () => manageService.getListAllManage({
      page: 1,
      page_size: 100,
      filters: {},
    }, id as string),
    enabled: !!id,
  });



  const store = data?.data;
  const manager = managerData?.data?.items?.[0];

  const deleteMutation = useMutation({
    mutationFn: (storeId: string) => storeService.deleteStore(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeList"] });
      navigate(`/brands/${store.brand_id}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (params: StoreParams & { id: string }) =>
      storeService.updateStore(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeDetail", id] });
      setIsUpdateModalOpen(false);
    },
  });

  const updateManagerMutation = useMutation({
    mutationFn: (params: UpdateManageParams) =>
      manageService.updateManage(params.id, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managerList", id] });
      setIsUpdateManagerModalOpen(false);
    },
  });

  const deleteManagerMutation = useMutation({
    mutationFn: (managerId: string) => manageService.deleteManage(managerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managerList", id] });
      setIsDeleteManagerModalOpen(false);
    },
  });

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    await deleteMutation.mutateAsync(id as string);
    setIsDeleteModalOpen(false);
  };

  const handleOpenUpdate = () => {
    formUpdate.setFieldsValue({
      name: store.name,
      address: store.address,
      phone_number: store.phone_number,
      custom_tax_rate: store.custom_tax_rate,
      is_active: store.is_active,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateOk = () => {
    formUpdate.validateFields().then((values) => {
      updateMutation.mutate({
        id: id as string,
        brand_id: store.brand_id,
        ...values,
      });
    });
  };

  const handleOpenUpdateManager = () => {
    formUpdateManager.setFieldsValue({
      email: manager.email,
      phone_number: manager.phone_number,
      first_name: manager.first_name,
      last_name: manager.last_name,
      roles: manager.roles,
    });
    setIsUpdateManagerModalOpen(true);
  };

  const handleUpdateManagerOk = () => {
    formUpdateManager.validateFields().then((values) => {
      updateManagerMutation.mutate({
        id: manager.id,
        ...values,
      });
    });
  };

  const openDeleteManagerModal = () => setIsDeleteManagerModalOpen(true);
  const closeDeleteManagerModal = () => setIsDeleteManagerModalOpen(false);

  const handleConfirmDeleteManager = async () => {
    await deleteManagerMutation.mutateAsync(manager.id);
    setIsDeleteManagerModalOpen(false);
  };

  if (isLoading) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <FallBack />
      </div>
    );
  }

  if (isError || !store) {
    return <div className={styles.notFound}>{t("store.notFound")}</div>;
  }

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          {
            title: (
              <span
                style={{ cursor: "pointer", color: "#3d8419" }}
                onClick={() => navigate(`/brands/${store.brand_id}`)}
              >
                {t("store.brand")}
              </span>
            ),
          },
          {
            title: t("store.storeInformation"),
          },
        ]}
      />

      <Card
        style={{ margin: "20px auto" }}
        title={t("store.storeInformation")}
        extra={
          <>
            <Button
              type="primary"
              onClick={handleOpenUpdate}
              style={{ marginRight: 8 }}
            >
              {t("common.update")}
            </Button>
            <Button danger onClick={openDeleteModal}>
              {t("common.delete")}
            </Button>
          </>
        }
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label={t("store.table.name")}>
            {store.name}
          </Descriptions.Item>
          <Descriptions.Item label={t("store.table.address")}>
            {store.address}
          </Descriptions.Item>
          <Descriptions.Item label={t("store.table.phoneNumber")}>
            {store.phone_number}
          </Descriptions.Item>
          <Descriptions.Item label={t("store.table.customTaxRate")}>
            {store.custom_tax_rate * 100}%
          </Descriptions.Item>
          <Descriptions.Item label={t("store.table.status")}>
            <Switch checked={store.is_active} disabled />
          </Descriptions.Item>
          <Descriptions.Item label={t("store.table.linkStore")}>
            <a
              href={`${API_BASE_URL_ADMIN}/${store.id}/login`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Admin Site
            </a>
          </Descriptions.Item>
        </Descriptions>
      </Card>

             {manager && (
         <Card
           style={{ margin: "20px auto" }}
           title={t("manage.managerInformation")}
           extra={
             <>
                               <Button
                  type="primary"
                  onClick={handleOpenUpdateManager}
                  style={{ marginRight: 8 }}
                >
                  {t("common.update")}
                </Button>
                               <Button danger onClick={openDeleteManagerModal}>
                  {t("common.delete")}
                </Button>
             </>
           }
         >
          <Descriptions bordered column={1}>
            <Descriptions.Item label={t("manage.table.email")}>
              {manager.email}
            </Descriptions.Item>
            <Descriptions.Item label={t("manage.table.phoneNumber")}>
              {manager.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label={t("manage.table.firstName")}>
              {manager.first_name}
            </Descriptions.Item>
            <Descriptions.Item label={t("manage.table.lastName")}>
              {manager.last_name}
            </Descriptions.Item>
            <Descriptions.Item label={t("manage.table.roles")}>
              {manager.roles?.join(", ")}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      <Modal
        title={t("store.updateTitle")}
        open={isUpdateModalOpen}
        onOk={handleUpdateOk}
        onCancel={() => setIsUpdateModalOpen(false)}
        okText={t("common.ok")}
        cancelText={t("common.cancel")}
        confirmLoading={updateMutation.isPending}
      >
        <Form layout="vertical" form={formUpdate}>
          <Form.Item
            label={t("store.table.name")}
            name="name"
            rules={[{ required: true, message: t("store.requiredName") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("store.table.address")}
            name="address"
            rules={[{ required: true, message: t("store.requiredAddress") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("store.table.phoneNumber")}
            name="phone_number"
            rules={[
              { required: true, message: t("store.requiredPhoneNumber") },
              { pattern: /^\d+$/, message: t("store.invalidPhoneNumber") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("store.table.customTaxRate")}
            name="custom_tax_rate"
            rules={[
              { required: true, message: t("store.requiredTaxRate") },
              {
                type: "number",
                min: 0.1,
                max: 1,
                message: t("store.invalidTaxRate"),
              },
            ]}
          >
            <InputNumber
              min={0.1}
              max={1}
              step={0.1}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label={t("store.table.status")}
            name="is_active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

             <Modal
         title={t("manage.updateTitle")}
         open={isUpdateManagerModalOpen}
         onOk={handleUpdateManagerOk}
         onCancel={() => setIsUpdateManagerModalOpen(false)}
         okText={t("common.ok")}
         cancelText={t("common.cancel")}
         confirmLoading={updateManagerMutation.isPending}
       >
         <Form layout="vertical" form={formUpdateManager}>
           <Form.Item
             label={t("manage.table.email")}
             name="email"
             rules={[
               { required: true, message: t("manage.requiredEmail") },
               { type: "email", message: t("manage.invalidEmail") },
             ]}
           >
             <Input />
           </Form.Item>
           <Form.Item
             label={t("manage.table.phoneNumber")}
             name="phone_number"
             rules={[
               { required: true, message: t("manage.requiredPhoneNumber") },
               { pattern: /^\d+$/, message: t("manage.invalidPhoneNumber") },
             ]}
           >
             <Input />
           </Form.Item>
           <Form.Item
             label={t("manage.table.firstName")}
             name="first_name"
             rules={[{ required: true, message: t("manage.requiredFirstName") }]}
           >
             <Input />
           </Form.Item>
           <Form.Item
             label={t("manage.table.lastName")}
             name="last_name"
             rules={[{ required: true, message: t("manage.requiredLastName") }]}
           >
             <Input />
           </Form.Item>
           <Form.Item
             label={t("manage.table.roles")}
             name="roles"
             rules={[{ required: true, message: "Vui lòng nhập vai trò" }]}
           >
             <Input placeholder="Nhập vai trò, phân cách bằng dấu phẩy" />
           </Form.Item>
         </Form>
       </Modal>

               <Modal
          title={t("manage.confirmDelete")}
          open={isDeleteManagerModalOpen}
          onCancel={closeDeleteManagerModal}
          onOk={handleConfirmDeleteManager}
          okText={t("common.delete")}
          cancelText={t("common.cancel")}
          okButtonProps={{ danger: true }}
          centered
          maskClosable={false}
          confirmLoading={deleteManagerMutation.isPending}
        >
          <h4>{t("manage.deleteWarning")}</h4>
        </Modal>

        <Modal
          title={t("store.confirmDelete")}
          open={isDeleteModalOpen}
          onCancel={closeDeleteModal}
          onOk={handleConfirmDelete}
          okText={t("common.delete")}
          cancelText={t("common.cancel")}
          okButtonProps={{ danger: true }}
          centered
          maskClosable={false}
        >
          <h4>{t("store.deleteWarning")}</h4>
        </Modal>
    </>
  );
};

export default StoreDetail;

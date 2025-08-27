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
  const [formUpdate] = Form.useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["storeDetail", id],
    queryFn: () => storeService.getDetailStore(id as string),
    enabled: !!id,
  });



  const store = data?.data;

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
            title: t("store.titleDetail"),
          },
        ]}
      />

      <Card
        style={{ margin: "20px auto" }}
        title={t("store.titleDetail")}
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

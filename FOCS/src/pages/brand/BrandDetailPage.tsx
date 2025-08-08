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
  message,
  Breadcrumb,
  Table,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import brandService from "../../services/brandService";
import styles from "./Brand.module.scss";
import FallBack from "../../components/common/fallback/FallBack";
import storeService from "../../services/storeService";

const BrandDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brandDetail", id],
    queryFn: () => brandService.getDetailBrand(id as string),
    enabled: !!id,
  });

  const { data: storeData, isLoading: isStoreLoading } = useQuery({
    queryKey: ["storeList", id],
    queryFn: () =>
      storeService.getListStore({
        page: 1,
        page_size: 100,
        filters: { brand_id: id as string },
      }),
    enabled: !!id,
  });

  const brand = data?.data;

  const deleteMutation = useMutation({
    mutationFn: (brandId: string) => brandService.deleteBrand(brandId),
    onSuccess: () => {
      message.success(t("brand.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: ["brandList"] });
      navigate("/brands");
    },
    onError: () => {
      message.error(t("brand.deleteFail"));
    },
  });

  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (params: any) => brandService.updateBrand(params),
    onSuccess: () => {
      message.success(t("brand.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: ["brandDetail", id] });
      setIsModalOpen(false);
    },
    onError: () => {
      message.error(t("brand.updateFail"));
    },
  });

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMutation.mutate(id as string);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    form.setFieldsValue({
      name: brand.name,
      default_tax_rate: brand.default_tax_rate,
      is_active: brand.is_active,
    });
    setIsModalOpen(true);
  };

  const handleUpdateOk = () => {
    form.validateFields().then((values) => {
      updateMutation.mutate({ id, ...values });
    });
  };

  if (isLoading) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, right: 0 }}>
        <FallBack />
      </div>
    );
  }

  if (isError || !brand) {
    return <div className={styles.notFound}>{t("brand.notFound")}</div>;
  }

  const storeColumns = [
    {
      title: t("store.table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("store.table.address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("store.table.phoneNumber"),
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: t("store.table.customTaxRate"),
      dataIndex: "custom_tax_rate",
      key: "custom_tax_rate",
      render: (rate: number) => `${rate * 100}%`,
    },
    {
      title: t("store.table.status"),
      dataIndex: "is_active",
      key: "is_active",
      render: (active: boolean) => <Switch checked={active} disabled />,
    },
  ];

  return (
    <>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          {
            title: (
              <span
                style={{ cursor: "pointer", color: "#3d8419" }}
                onClick={() => navigate("/brands")}
              >
                {t("brand.title")}
              </span>
            ),
          },
          {
            title: t("brand.titleDetail"),
          },
        ]}
      />
      <Card
        style={{ margin: "20px auto" }}
        title={t("brand.titleDetail")}
        extra={
          <>
            <Button
              type="primary"
              onClick={handleUpdate}
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
          <Descriptions.Item label={t("brand.table.brandName")}>
            {brand.name}
          </Descriptions.Item>
          <Descriptions.Item label={t("brand.table.defaultTaxRate")}>
            {brand.default_tax_rate * 100}%
          </Descriptions.Item>
          <Descriptions.Item label={t("brand.table.status")}>
            <Switch checked={brand.is_active} disabled />
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title={t("brand.updateTitle")}
        open={isModalOpen}
        onOk={handleUpdateOk}
        onCancel={() => setIsModalOpen(false)}
        okText={t("common.ok")}
        cancelText={t("common.cancel")}
        confirmLoading={updateMutation.isPending}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label={t("brand.table.brandName")}
            name="name"
            rules={[{ required: true, message: t("brand.requiredName") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("brand.table.defaultTaxRate")}
            name="default_tax_rate"
            rules={[{ required: true, message: t("brand.requiredTaxRate") }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label={t("brand.table.status")}
            name="is_active"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={t("brand.confirmDelete")}
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onOk={handleConfirmDelete}
        okText={t("common.delete")}
        cancelText={t("common.cancel")}
        okButtonProps={{ danger: true }}
        centered
        maskClosable={false}
      >
        <h4>{t("brand.deleteWarning")}</h4>
      </Modal>
      <Card title={t("store.titleList")} style={{ marginTop: 20 }}>
        <Table
          dataSource={storeData?.data || []}
          columns={storeColumns}
          rowKey="id"
          loading={isStoreLoading}
          pagination={false}
        />
      </Card>
    </>
  );
};

export default BrandDetail;

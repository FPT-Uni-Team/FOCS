import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { ListPageParams } from "../../type/common/common";
import brandService, { type BrandParams } from "../../services/brandService";
import StatusTag from "../../components/common/Status/StatusTag";
import CustomLink from "../../components/common/Link/CustomLink";

const BrandPage: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const params: ListPageParams = {
    page: 1,
    page_size: 100,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["brands", params],
    queryFn: () => brandService.getListBrand(params),
  });

  const createBrandMutation = useMutation({
    mutationFn: (newBrand: BrandParams) => brandService.createBrand(newBrand),
    onSuccess: () => {
      message.success(t("common.createSuccess"));
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: () => {
      message.error(t("common.createFailed"));
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        createBrandMutation.mutate(values);
      })
      .catch(() => {});
  };

  const columns = [
    {
      title: t("brand.table.brandName"),
      dataIndex: "name",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: any) => (
        <CustomLink href={`/brands/${record.id}`} title={record.name} />
      ),
    },
    {
      title: t("brand.table.defaultTaxRate"),
      dataIndex: "default_tax_rate",
      render: (rate: number) => `${rate * 100}%`,
    },
    {
      title: t("brand.table.status"),
      dataIndex: "is_active",
      render: (isActive: boolean) => (
        <StatusTag status={isActive ? "available" : "unavailable"} />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h2>
          {t("brand.title")} ({data?.data?.total_count || 0})
        </h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          {t("brand.button.createBrand")}
        </Button>
      </Space>

      <Table
        columns={columns}
        loading={isLoading}
        dataSource={data?.data?.items}
        pagination={false}
        rowKey="id"
      />

      <Modal
        title={t("brand.button.createBrand")}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText={t("common.ok")}
        cancelText={t("common.cancel")}
        confirmLoading={createBrandMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={t("brand.table.brandName")}
            name="name"
            rules={[{ required: true, message: t("common.required") }]}
          >
            <Input placeholder={t("brand.table.brandName")} />
          </Form.Item>

          <Form.Item
            label={t("brand.table.defaultTaxRate")}
            name="default_tax_rate"
            rules={[
              { required: true, message: t("common.required") },
              {
                type: "number",
                min: 0.01,
                max: 1,
                message: t("brand.table.taxRateRange"),
              },
            ]}
          >
            <InputNumber
              min={0.01}
              max={1}
              step={0.01}
              style={{ width: "100%" }}
              placeholder={t("brand.table.defaultTaxRate")}
            />
          </Form.Item>

          <Form.Item
            label={t("brand.table.status")}
            name="is_active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BrandPage;

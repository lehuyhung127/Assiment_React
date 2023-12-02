import {
  Popconfirm,
  Space,
  Table,
  Button,
  message,
  Form,
  Input,
  Upload,
  InputNumber,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import ModalForm from "../../../components/ModalForm/ModalForm";
import axios from "axios";

const { Dragger } = Upload;
import "./index.css";
import { fetchAllProduct, fetchCreatProduct, fetchDeleteProduct, fetchUpdateProduct } from "../../../Redux/Slices/productSlice";
import IProduct from "../../../interfaces/product";
import { fetchAllCategory } from "../../../Redux/Slices/categorySlice";
import { Option } from "antd/es/mentions";

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");

  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.product.products);
  // console.log({ products });
  const categories = useAppSelector((state) => state.category.categorys);
  // console.log({ categories });

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const confirm = async (idProduct: string) => {
    await dispatch(fetchDeleteProduct(idProduct));
    await dispatch(fetchAllProduct());
    message.success(`Xóa thành công!`);
  };

  const cancel = () => {
    message.error("Đã hủy!");
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Ảnh Sản Phẩm",
      dataIndex: "image",
      key: "image",
      render: (image) => <img width={150} src={image} />,
    },
    {
      title: "Giá Sản Phẩm",
      key: "price",
      dataIndex: "price",

    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              const product = products?.find(
                (product: IProduct) => product?._id === record?._id
              );

              form.setFieldsValue({
                _id: product?._id,
                name: product?.name,
                image: product?.image,
                price: product?.price,
              });
              showModal("edit");
            }}
            ghost
          >
            <EditOutlined style={{ display: "inline-flex" }} />
            Sửa
          </Button>

          <Popconfirm
            placement="topRight"
            title="Xóa bài viết?"
            description="Bạn có chắc chắn xóa không?"
            onConfirm={() => confirm(record._id)}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Không"
          >
            <Button type="primary" danger>
              <DeleteOutlined style={{ display: "inline-flex" }} />
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = products.map((item: IProduct, index: number) => ({
    ...item,
    key: index,
  }));

  // call creat danh mục

  const options: { value: string; label: string }[] = categories?.map((data: any) => ({
    value: data._id,
    label: data.name,
  }));

  const showModal = (mode: string) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log({ values });

    if (modalMode === "add") {
      const image = values?.image?.file?.response?.data?.url
      console.log({ image });


      const newValues = { ...values, image };

      await dispatch(fetchCreatProduct(newValues));
      message.success(`Tạo bài viết thành công!`);
    } else if (modalMode === "edit") {
      const image = values.image?.fileList
        ?
        values?.image?.fileList[0]?.response?.data?.url
        : values.image;
      console.log("idm", image);

      const newValues = { ...values, image };
      const { _id, ...product } = newValues;

      await dispatch(fetchUpdateProduct({ _id, product }));
      await dispatch(fetchAllProduct());
      message.success(`Sửa bài viết thành công!`);
    }
    setIsModalOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploadFiles = async (file: any) => {
    if (file) {
      const CLOUD_NAME = "dwp7umncy";
      const PRESET_NAME = "bookshop";
      const FOLDER_NAME = "ass_ecma";
      const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
      formData.append("file", file);

      const response = await axios.post(api, formData);

      return response;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      // Gọi hàm tải lên ảnh của bạn và chờ kết quả
      const response = await uploadFiles(file);
      // Kiểm tra kết quả và xử lý tùy theo trạng thái tải lên
      if (response?.status === 200) {
        message.success(`${file.name} uploaded successfully`);
        onSuccess(response, file);
      } else {
        message.error(`${file.name} upload failed.`);
        onError(response);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      message.error("An error occurred while uploading the image.");
      onError(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <div>
          <h1 className="text-[25px] font-sans font-[700]">Quản Trị Sản Phẩm !</h1>
        </div>
        <div>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size={"large"}
            className="bg-[#1677ff]"
            onClick={() => {
              form.resetFields();
              showModal("add");
            }}
          >
            Thêm Sản Phẩm
          </Button>
        </div>

      </div>
      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={data}
        rowSelection={{}}

      />
      <ModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        form={form}
        modalMode={modalMode}
      >
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
        >
          {modalMode === "edit" && (
            <Form.Item name="_id" style={{ display: "none" }}>
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="name"
            label="Tên Sản Phẩm"
            rules={[
              { required: true },
              { whitespace: true, message: "${label} is required!" },
            ]}
          >
            <Input size="large" placeholder="Nhập Tên Sản Phẩm" />
          </Form.Item>

          <Form.Item name="image" label="Ảnh Sản Phẩm" rules={[{ required: true }]}>
            <Dragger listType="picture" customRequest={customRequest}>
              <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
            </Dragger>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá Sản Phẩm"
            rules={[{ required: true, type: "number", min: 0 }]}
          >
            <InputNumber
              size="large"
              placeholder="Nhập Giá Sản Phẩm"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Danh Mục"
            rules={[{ required: true }]}
          >
            <Select size="large" placeholder="---- Danh Mục ----">
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </ModalForm>
    </>
  );
};

export default DashboardPage;


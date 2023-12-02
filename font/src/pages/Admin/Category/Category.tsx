import {
    Popconfirm,
    Space,
    Table,
    Button,
    message,
    Form,
    Input,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import ModalForm from "../../../components/ModalForm/ModalForm";
import "./index.css";
import { fetchAllCategory, fetchCreatCategory, fetchDeleteCategory, fetchUpdateCategory } from "../../../Redux/Slices/categorySlice";
import ICategory from "../../../interfaces/category";

const Category = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("");

    const dispatch = useAppDispatch();

    const catego = useAppSelector((state) => state.category.categorys);
    console.log({ catego });


    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);

    const confirm = async (idCate: string) => {
        await dispatch(fetchDeleteCategory(idCate));
        message.success(`Xóa thành công!`);
    };

    const cancel = () => {
        message.error("Đã hủy!");
    };

    const columns: ColumnsType<ICategory> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <span>{text}</span>,
        },

        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => {
                            const category = catego?.find(
                                (cate: ICategory) => cate._id === record._id
                            );

                            form.setFieldsValue({
                                _id: category?._id,
                                name: category?.name,
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
                        title="Xóa Danh Mục Này?"
                        description="Bạn có chắc chắn xóa danh mục này không?"
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

    const data = catego.map((item: ICategory, index: number) => ({
        ...item,
        key: index,
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        if (modalMode === "add") {
            await dispatch(fetchCreatCategory(values));
            message.success(`Tạo Danh Mục thành công!`);
        } else if (modalMode === "edit") {
            const newValues = values;
            const { _id, ...category } = newValues;

            await dispatch(fetchUpdateCategory({ _id, category }));
            message.success(`Sửa bài viết thành công!`);
        }
        setIsModalOpen(false);
    };


    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-[25px] font-sans font-[700]">Quản Trị Danh Mục !</h1>
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
                        Thêm Danh Mục
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
                        label="Danh Mục"
                        rules={[
                            { required: true },
                            { whitespace: true, message: "${label} is required!" },
                        ]}
                    >
                        <Input size="large" placeholder="Danh Mục" />
                    </Form.Item>
                </Form>
            </ModalForm>
        </>
    );
};

export default Category;

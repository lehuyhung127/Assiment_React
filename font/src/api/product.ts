import instance from "./config";

export const getAllProduct = () => {
    return instance.get(`/products`);
};
export const getOneProduct = (id: any) => {
    return instance.get(`/products/${id}`);
};
export const getCreatProduct = (product: any) => {
    return instance.post(`/products`, product);
};
export const getUpdateProduct = (id: any, product: any) => {
    return instance.put(`/products/${id}`, product);
};

export const getDeleteProduct = (id: any) => {
    return instance.delete(`/products/${id}`);
};
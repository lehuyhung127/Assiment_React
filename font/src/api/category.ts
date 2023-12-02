import instance from "./config";

export const getAllCategory = () => {
    return instance.get(`/categories`);
};
export const getOneCategory = (id: any) => {
    return instance.get(`/categories/${id}`);
};
export const getCreatCategory = (category: any) => {
    return instance.post(`/categories`, category);
};
export const getUpdateCategory = (id: any, category: any) => {
    return instance.put(`/categories/${id}`, category);
};
export const getDeleteCategory = (id: any) => {
    return instance.delete(`/categories/${id}`);
};
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import './index.css'
import { fetchAllProduct, fetchProductsAllcate, filter, filterByCategory } from '../../Redux/Slices/productSlice';
import { Link } from 'react-router-dom';
import { fetchAllCategory } from '../../Redux/Slices/categorySlice';
import { Empty, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { SearchOutlined } from '@ant-design/icons';

const ProductAllPage = () => {
    const dispatch = useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState(null); // lưu id cate
    console.log({ selectedCategory });


    const products = useAppSelector((state) => state.product.products);
    const categorys = useAppSelector((state) => state.category.categorys);
    // console.log("categoryAll", categorys);

    // Xử Lí Lọc Theo Danh Mục
    const handleChange = (value: any) => {
        dispatch(filterByCategory(value));
    };
    useEffect(() => {
        try {
            if (selectedCategory) {
                console.log("id cate", selectedCategory);
                dispatch(fetchProductsAllcate(selectedCategory));
            } else {
                dispatch(fetchAllProduct());
            }
        } catch (error) {
            console.log(error);
        }
    }, [selectedCategory, dispatch]);
    // kết thúc lọc
    const handlefil = (value: any) => {
        const filteredItems = products.filter((item: any) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        console.log(filteredItems);
        if (value === "") {
            dispatch(fetchAllProduct());
        }
        dispatch(filter(value.trim()))
    }

    useEffect(() => {
        try {
            // dispatch(fetchAllProduct());
            dispatch(fetchAllCategory());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);
    return (
        <div className='pt-[100px]'>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <header className='flex justify-center'>
                        <img className='w-[200px]' src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Yody.png" alt="" />
                    </header>

                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <Select
                                size="large"
                                placeholder="Danh Mục"
                                onChange={handleChange}
                            >
                                {categorys.map((option) => (
                                    <Option key={option._id} value={option._id}>
                                        {option.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="flex rounded border border-gray-100">
                            <button
                                className="bg-[#FCAF17] px-[28px] rounded-l-lg"
                            >
                                <SearchOutlined />
                            </button>

                            <input
                                type='text'
                                placeholder='Tìm Kiếm'
                                onChange={(e) => handlefil(e.target.value)}
                                className='block rounded-r-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                    {/* list */}
                    <div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products && products.length > 0 ? (
                                products.map((data: any) => (
                                    <div className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            <img src={data.image} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                        </div>
                                        <div className="mt-4 ">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <Link to={`/detail/${data._id}`} className='text-black font-sans font-[700]'>
                                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                                        {data.name}
                                                    </Link>

                                                </h3>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900 py-[10px]">{data.price}đ</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div> <Empty /></div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="overflow-hidden  sm:grid sm:grid-cols-2 sm:items-center my-[40px]"
            >
                <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                    <div
                        className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                            Áo phông nữ là gì?
                        </h2>

                        <p className="hidden text-gray-500 md:mt-4 md:block">
                            Áo thun nữ chính hãng do thương hiệu YODY thiết kế không những đa dạng về mẫu mã mà còn được đánh giá cao bởi chất liệu vải. Đến với thời trang YODY bạn sẽ được tư vấn và phục vụ nhiệt tình về cách phối đồ hợp với thời trang và dáng người đặc biệt là mua sắm áo phông nữ với giá ưu đãi nhất.
                        </p>

                        <div className="mt-4 md:mt-8">
                            <a
                                href="#"
                                className="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                Xem Ngay !
                            </a>
                        </div>
                    </div>
                </div>

                <img
                    alt="Violin"
                    src="https://bizweb.dktcdn.net/100/438/408/files/ao-phong-nu-yody-vn.png?v=1652250519637"
                    className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
                />
            </section>
        </div>
    )
}

export default ProductAllPage
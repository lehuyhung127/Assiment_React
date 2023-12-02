import { useNavigate, useParams } from 'react-router-dom'
import IProduct from '../../interfaces/product'
import { useEffect, useState } from 'react'
import { getOneProduct } from '../../api/product'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../../Redux/hook'
import { fetchAddToCart } from '../../Redux/Slices/cartSlice'
import { message } from 'antd'
import Cookies from 'js-cookie'
import './index.css'



const DetailProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<IProduct>({} as IProduct)
    useEffect(() => {
        getOneProduct(String(id)).then(({ data: { product } }) => setProducts(product))
    }, [])
    console.log('detail', products);

    //add to cart
    const accessToken = Cookies.get("accessToken");
    const { register, handleSubmit, setValue } = useForm({});
    useEffect(() => {
        setValue('productId', products._id); // Đặt giá trị mặc định cho trường 'id'
    }, [products._id, setValue]);
    const onSubmit = async (values: any) => {
        console.log({ values });
        if (!accessToken) {
            message.warning("Bạn phải Đăng Nhập Để Thực Hiện Thêm Giỏ Hàng !!");
            navigate('/signin');
            return
        }
        try {
            dispatch(fetchAddToCart(values))
            message.success("Thêm vào giỏ hàng Thành Công");
            navigate('/cart')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='pt-[100px]'>
            <div className="infor-product-details mx-[200px]">
                <div className="container">
                    <div className="content-product-details">
                        <span className="name-product-details"> {products.name}</span>
                        <div className="img-infor-product-details">
                            <div className="left-img-details">
                                <div className="img-product-details">
                                    <img src={products.image} alt="image not" />
                                </div>
                                <hr className="seperate" />
                                <div className="details">
                                    <h4 className="title-details"> Đặc tính nổi bật </h4>
                                    <p>- Áo thun chất liệu: 100% Cotton BCI mềm mại, bề mặt vải bông xốp</p>
                                    <p>- Bông làm áo được trồng theo tiêu chuẩn ECO an toàn cho làn da</p>
                                    <p>- Có khả năng hút ẩm và thoát ẩm nhanh giúp người dùng luôn cảm thấy thoải mái và khô
                                        ráo trong suốt quá trình sử dụng </p>
                                    <p>- Áo thoải mái giặt tay mà không lo chảy xệ hay bai dão </p>
                                    <p>- Độ bền cao, sử dụng được lâu qua nhiều lần giặt </p>
                                    <p>- Kiểu dáng basci cùng hoạ tiết trơn nên rất dễ mặc, dễ phối cùng nhiều trang phục và
                                        hoàn cảnh khác nhau </p>
                                    <p>- Có thể mix cùng quần jeans, short, chân váy để đi chơi, dạo phố, đi làm, đi học
                                    </p>
                                </div>
                                <hr className="seperate" />
                                <h4 className="title-details"> Đánh giá </h4>
                                <div className="content-evaluate">
                                    <p className="text-evaluate"> Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành
                                        người đầu tiên đánh giá cho sản phẩm này </p>
                                    <button className="btn-evaluate">Gửi đánh giá của bạn</button>
                                </div>
                                <hr className="seperate" />
                            </div>

                            <div className="content-item-product">
                                <span className="name-product"> {products.name} </span>
                                <span className="price-product"> {products.price}đ </span>
                                <div className="size-product">
                                    <span > Kích thước </span>
                                    <div className="size-item">
                                        <button type='radio'> M </button>
                                        <button> L </button>
                                        <button> XL </button>
                                        <button> 2XL </button>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="minus-plus-add">
                                        <div className="quantity-product">
                                            <input type="number" min={1} defaultValue={1} {...register("quantity")}
                                                className="group relative text-center mt-[4px] flex items-center w-[85px] py-[7px] justify-center rounded-md border text-[18px] font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1  cursor-pointer bg-white text-gray-900 shadow-sm" />
                                        </div>
                                        <input type="text" hidden {...register("productId")} />
                                        <button className="add-cart"> Thêm vào giỏ hàng </button>
                                    </div>
                                </form>
                                <div className="list-endow">
                                    <div className="item-endow">
                                        <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/ic_payment_freeship.svg?1697705318009" alt="" />
                                        <span> Miễn phí vận chuyển
                                            với mọi đơn hàng từ 498k </span>
                                    </div>
                                    <div className="item-endow">
                                        <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/ic_payment_freechange.svg?1697705318009" alt="" />
                                        <span> Miễn phí vận chuyển
                                            với mọi đơn hàng từ 498k </span>
                                    </div>
                                    <div className="item-endow">
                                        <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/empty-wallet-tick.svg?1697705318009" alt="" />
                                        <span> Miễn phí vận chuyển
                                            với mọi đơn hàng từ 498k </span>
                                    </div>
                                    <div className="item-endow">
                                        <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/ic_payment_fastship.svg?1697705318009" alt="" />
                                        <span> Miễn phí vận chuyển
                                            với mọi đơn hàng từ 498k </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
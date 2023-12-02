import { useNavigate } from 'react-router-dom';
import './index.css'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Empty, message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { fetchCartUser } from '../../Redux/Slices/cartSlice';

const CartPage = () => {
    const navigate = useNavigate();
    // NGĂN CHẠN NGƯỜI DÙNG KHI CHƯA ĐĂNG NHẬP
    const accessToken = Cookies.get("accessToken");
    useEffect(() => {
        if (!accessToken) {
            navigate("/signin");
            message.warning("Bạn phải đăng nhập để truy cập giỏ hàng");
        }
    }, [accessToken, navigate]);
    //call Redux
    const dispatch = useAppDispatch();

    const cartUser = useAppSelector((state) => state.cart.entities);
    console.log("CartUsser", cartUser?.cart?.products);
    const dataCart = cartUser?.cart?.products;


    useEffect(() => {
        dispatch(fetchCartUser());
    }, [dispatch]);
    return (
        <div className='pt-[100px]'>
            <div className="content-cart">
                <div className="container">
                    <div className="item-price-cart">
                        <div className="list-product-buy-left">
                            <h2 className="title-cart">
                                giỏ hàng
                                <span className="number-product"> ( 0 ) Sản phẩm </span>
                            </h2>
                            <hr className="seperate" />
                            <span className="text-buy-more"> Mua thêm 574.000đ để nhận thêm quà tặng </span>
                            <span className="text-promotion"> * CTKM áp dụng với toàn bộ sản phẩm </span>
                            <hr className="seperate" />
                            <div className="">
                                <div className="title-item-cart">
                                    <span> Sản phẩm </span>
                                    <span> Đơn giá </span>
                                    <span> Số Lượng </span>
                                    <span> Tổng tiền </span>
                                </div>
                                {dataCart && dataCart.length > 0 ? (
                                    dataCart.map((data: any) => (
                                        <div className="item-cart">
                                            <div className="product-title">
                                                <img src={data.productId.image} alt="" />
                                                <td />
                                                <div className="name-size-product">
                                                    <span > {data.productId.name} </span>
                                                </div>
                                            </div>
                                            <span className="price-product"> {data.productId.price}đ </span>
                                            <div className="quantity-product">
                                                <button className="btn-minus"> - </button>
                                                <button> {data.quantity} </button>
                                                <button className="btn-plus"> + </button>
                                            </div>
                                            <div className="total-money-icon">
                                                <span className="total-money-product"> {data.productId.price * data.quantity}đ </span>
                                                <i className="fa-regular fa-trash-can btn-trash-can"> </i>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div><Empty /></div>
                                )}


                            </div>
                        </div>
                        <div className="order-right">
                            <img src="https://vuakhuyenmai.vn/wp-content/uploads/yody_black_friday.jpg" alt="" />
                            <span className="discount-code"> Dùng mã giảm giá của YODY trong bước tiếp theo </span>
                            <div className="total-product-price">
                                <span> Tổng đơn hàng (Tạm tính): </span>
                                <span> 000.000đ </span>
                            </div>
                            <button className="order-product"> Đặt hàng <span> (0) </span> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
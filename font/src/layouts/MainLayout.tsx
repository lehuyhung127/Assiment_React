import { Link, Outlet } from 'react-router-dom';
import './mainLayout.css'
import { EnvironmentOutlined, FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined, ShopOutlined, TwitterOutlined, UserAddOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
const MainLayout = () => {
  return <div>
    <header className="header fixed w-full z-50">
      <div className="nav-bar">
        <div className="container pr-[100px] pl-[100px]">
          <div className="nav-item">
            <div className="item-list">
              <ul className="item-list-path">
                <div className="logo-search">
                  <a href="/">
                    <img src="https://file.hstatic.net/200000473357/file/frame-logo_b61c0616110d41098a1d231657356290.png"
                      alt="" className='w-20' />
                  </a>
                </div>
                <div className='flex items-center'>
                  <li className="hover">
                    <Link to={`/`} className="after-cl-yellow">Trang Chủ</Link>
                  </li>
                  <li className="hover">
                    <Link to={`/product`} className="after-cl-yellow">Sản Phẩm</Link>
                  </li>
                  <li className="hover">
                    <Link to={`/about`} className="after-cl-yellow">Về Chúng Tôi</Link>
                  </li>
                  <li className="">
                    <Link to={`/blog`} className="after-cl-yellow">Tin Tức</Link>
                  </li>
                </div>

              </ul>
            </div>
            <div className="item-account-cart">
              <div className="cart">
                <Link to={`/cart`}>
                  <Icon icon="solar:cart-linear" className=' text-[30px] mr-14' />
                  <span className="number"> 0 </span>
                </Link>
              </div>
              <div className="account">
                <Link to={`/signin`} ><Icon icon="iconamoon:profile"/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <Outlet />
    </main>

    <footer className=' '>
      <div className="footer " >
        <div className="container flex justify-center">
          <div className="content-footer ">
            <div className="infor-title flex justify-center">
              <div className="infor-icon">
                <p> “Đặt sự hài lòng của khách hàng là ưu tiên số 1 trong mọi suy nghĩ hành động của mình”
                  là sứ mệnh, là triết lý,
                  chiến lược.. luôn cùng YODY tiến bước </p>
                <ul>
                  <li>
                    <a href="" > <FacebookOutlined /> </a>
                  </li>
                  <li>
                    <a href=""> <YoutubeOutlined /> </a>
                  </li>
                  <li>
                    <a href=""> <InstagramOutlined /> </a>
                  </li>
                  <li>
                    <a href="">
                      <TwitterOutlined />
                    </a>
                  </li>
                  <li>
                    <a href=""> <i className="fa-brands fa-shopify"></i> </a>
                  </li>
                </ul>
              </div>
              <div className="infor-path">
                <ul>
                  <h4> VỀ YODY </h4>
                  <li>
                    <a href=""> Giới thiệu </a>
                  </li>
                  <li>
                    <a href=""> Liên hệ </a>
                  </li>
                  <li>
                    <a href=""> Tuyển dụng</a>
                  </li>
                  <li>
                    <a href="news/new.html"> Tin tức </a>
                  </li>
                  <li>
                    <a href=""> Hệ thống cửa hàng </a>
                  </li>
                </ul>
                <ul>
                  <h4> HỖ TRỢ KHÁCH HÀNG </h4>
                  <li>
                    <a href=""> Hướng dẫn chọn size </a>
                  </li>
                  <li>
                    <a href=""> Chính sách khách hàng thân thiết </a>
                  </li>
                  <li>
                    <a href=""> Chính sách đổi/trả </a>
                  </li>
                  <li>
                    <a href=""> Chính sách bảo mật </a>
                  </li>
                  <li>
                    <a href=""> Thanh toán, giao nhận </a>
                  </li>
                  <li>
                    <a href=""> Chính sách Đồng phục </a>
                  </li>
                  <li>
                    <a href=""> Chính sách bảo mật thông tin khách hàng </a>
                  </li>
                </ul>
                <ul>
                  <h4> CÔNG TY CP THỜI TRANG YODY </h4>
                  <li className="align-center">
                    <a href="">
                      <EnvironmentOutlined />
                      Đường An Định - Phường Việt Hòa - Thành phố Hải Dương - Hải Dương
                    </a>
                  </li>
                  <li className="align-center">
                    <a href="">
                      <ShopOutlined />
                      Tìm cửa hàng gần bạn nhất
                    </a>
                  </li>
                  <li className="align-center">
                    <a href="">
                      <PhoneOutlined />
                      Liên hệ đặt hàng: 024 999 86 999
                    </a>
                  </li>
                  <li className="align-center">
                    <a href="">
                      <MailOutlined />
                      Email: chamsockhachhang@yody.vn
                    </a>
                  </li>
                  <li className="img-center">
                    <a href="http://online.gov.vn/Home/WebDetails/44085?AspxAutoDetectCookieSupport=1">
                      <img src="../images/logo-brand/logo_bct.png" alt="" />
                    </a>
                    <a
                      href="https://www.dmca.com/Protection/Status.aspx?ID=d3a2c2c5-a581-451b-b7ff-ff08fee58d6a&refurl=https://yody.vn/">
                      <img src="../images/logo-brand/_dmca_premi_badge_5.png" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <span> © YODY - Bản quyền thuộc về Công ty cổ phần thời trang YODY </span>
          </div>
        </div>
      </div>
    </footer>


    {/* ahv */}
  </div>;
};

export default MainLayout;

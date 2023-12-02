import { useEffect } from 'react';
import './index.css'
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { fetchAllProduct } from '../../Redux/Slices/productSlice';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';
import { Carousel } from 'antd';
import { Tabs } from 'antd';

const contentStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const { TabPane } = Tabs;

const onChange = (key: any) => {
  console.log(key);
};




const Home = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.product.products);
  console.log("productHome", products);


  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);
  const items: any['items'] = [
    {
      key: '1',
      label: 'Nữ',
      content: <div className='w-full'>
        <div className='flex justify-center'>
          <div className="flex gap-[20px]">
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_1_child_1_image.png?1697695390975" alt="" />
              <span> ÁO KHOÁC </span>
            </a>

            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_1_child_3_image.png?1697695390975" alt="" />
              <span> ÁO POLO </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_1_child_12_image.png?1697695390975" alt="" />
              <span> ÁO CHỐNG NẮNG </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_1_child_6_image.png?1697695390975" alt="" />
              <span> CHÂN VÁY </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_1_child_7_image.png?1697695390975" alt="" />
              <span> QUẦN ÂU </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_1_child_5_image.png?1697695390975" alt="" />
              <span> QUẦN BÒ </span>
            </a>
          </div>
        </div>
      </div>,
    },
    {
      key: '2',
      label: 'Nam',
      content: <div>
        <div className='flex justify-center'>
          <div className="flex gap-[20px]">
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_2_child_1_image.png?1697709793527" alt="" />
              <span> ÁO KHOÁC </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_2_child_3_image.png?1697709793527" alt="" />
              <span> ÁO POLO </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_1_child_12_image.png?1697695390975" alt="" />
              <span> ÁO CHỐNG NẮNG </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_2_child_5_image.png?1697709793527" alt="" />
              <span> BỘ ĐỒ </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_2_child_9_image.png?1697709793527" alt="" />
              <span> QUẦN ÂU </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_2_child_8_image.png?1697709793527" alt="" />
              <span> QUẦN BÒ </span>
            </a>
          </div>
        </div>
      </div>,
    },
    {
      key: '3',
      label: 'Trẻ Em',
      content: <div>
        <div className='flex justify-center'>
          <div className="flex gap-[20px]">
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_3_child_4_image.png?1697709793527" alt="" />
              <span> ÁO POLO </span>
            </a>

            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_3_child_3_image.png?1697709793527" alt="" />
              <span> BỘ ĐỒ </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_3_child_1_image.png?1697709793527" alt="" />
              <span> ÁO KHOÁC </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_3_child_5_image.png?1697709793527" alt="" />
              <span> CHÂN VÁY </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_3_child_7_image.png?1697709793527" alt="" />
              <span> QUẦN DÀI </span>
            </a>
            <a href="">
              <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/home_danhmuc_3_child_8_image.png?1697709793527" alt="" />
              <span> QUẦN ĐÙI </span>
            </a>
          </div>
        </div>
      </div>,
    },
  ];
  return <div>

    <section className="pt-[100px]">
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/slider_5.jpg?1697637902983" alt="" />
          </h3>
        </div>
        <h3 style={contentStyle}>
          <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/slider_4.jpg?1697637902983" alt="" />
        </h3>
        <h3 style={contentStyle}>
          <img src="https://bizweb.dktcdn.net/100/438/408/themes/919724/assets/slider_2.jpg?1697699332191" alt="" />
        </h3>
      </Carousel>
    </section >
    {/* all product */}

    <section className=' mt-[30px] flex justify-center w-full'>
      <Tabs defaultActiveKey="1" onChange={onChange} className='flex justify-center '>
        {items.map((item: any) => (
          <TabPane tab={item.label} key={item.key} >
            {item.content}
          </TabPane>
        ))}
      </Tabs>
    </section>

    <section className='mt-[30px]'>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Hàng Mới Về</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products && products.length > 0 ? (
              products.slice(0, 4).map((data: any) => (
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

  </div >
};

export default Home;

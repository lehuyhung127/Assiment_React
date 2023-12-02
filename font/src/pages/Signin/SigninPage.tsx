import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { useForm } from 'react-hook-form'
import { signin } from '../../api/user'
import Cookies from 'js-cookie'
import { message } from 'antd'

const SigninPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSignin = async (values: any) => {
        console.log(values);
        try {
            const response = await signin(values);
            console.log({ response });
            //gán lên Cookies
            Cookies.set("accessToken", response?.data?.accessToken, {
                expires: new Date(Date.now() + 30 * 60 * 1000),
            });
            if (response.data.user.role == 'admin') {
                message.success('Đăng nhập thành công Admin !');
                navigate('/admin');
            } else {
                message.success(`Đăng nhập thành công ${response.data.user.name} !`);
                navigate('/');
            }

        } catch (error: any) {
            console.log(error);
            message.warning(`${error?.response?.data.message}`)
        }

    }
    return (
        <div className='pt-[100px]'>
            <div className="box-login">
                <div className="container">
                    <div className="form-content" >
                        <span> Chào mừng bạn đến với Yody! </span>
                        <div className="fill-in">
                            <span className="text-blue"> ĐĂNG
                                <span className="text-yellow">
                                    NHẬP
                                </span>
                            </span>
                            <form onSubmit={handleSubmit(onSignin)}>
                                <input {...register("email")} type="email" placeholder="Email@gmail.com" />
                                <input {...register("password")} type="password" placeholder="Password" />
                                <button> Đăng Nhập </button>
                            </form>
                        </div>
                        <div className="acc-login">
                            <span> Bạn chưa có tài khoản?. </span>
                            <Link to={`/signup`}>Đăng ký ngay!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninPage
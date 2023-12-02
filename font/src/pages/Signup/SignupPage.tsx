import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import { useForm } from 'react-hook-form';
import { signup } from '../../api/user';
import { message } from 'antd';

const SignupPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSignup = async (values: any) => {
        console.log(values);
        try {
            const response = await signup(values);
            console.log({ response });
            message.success(`Đăng kí thành công ${response.data.user.name} !`)
            navigate('/signin');

        } catch (error: any) {
            console.log(error);
            message.warning(`${error?.response?.data.message}`)
        }

    }


    return (
        <div className='pt-[100px]'>
            <div className='box-register'>
                <div className='container'>
                    <div className="form-content" >
                        <span> Chào mừng bạn đến với Yody! </span>
                        <div className="fill-in">
                            <span className="text-blue"> ĐĂNG
                                <span className="text-yellow">
                                    KÝ
                                </span>
                            </span>
                            <form onSubmit={handleSubmit(onSignup)}>
                                <input {...register("name")} type="text" placeholder="Họ và tên" />
                                <input {...register("email")} type="email" placeholder="Email@gmail.com" />
                                <input {...register("password")} type="password" placeholder="Password" />
                                <input {...register("confirmPassword")} type="password" placeholder="confirmPassword" />
                                <button> Đăng Ký </button>
                            </form>
                        </div>
                        <div className="acc-login">
                            <span> Bạn đã có tài khoản ?. </span>
                            <Link to={`/signin`}>Đăng Nhập.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
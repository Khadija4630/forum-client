import { useContext,  useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {  toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
    // const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axios = useAxiosPublic();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                const userInfo = {
                    email: user.email,
                    name: user.displayName || "Anonymous", 
                    photoURL: user.photoURL || "/default-avatar.png",
                };
                const response =  axios.post("/users", userInfo);
                console.log ("user inserted", response);
        if ( response.data) {
            toast.success("Welcome! Your account has been created.");
        } else {
            toast.info("Welcome back!");
        }
                navigate(from, { replace: true });
            })
    }

    // const handleValidateCaptcha = (e) => {
    //     const user_captcha_value = e.target.value;
    //     if (validateCaptcha(user_captcha_value)) {
    //         setDisabled(false);
    //     }
    //     else {
    //         setDisabled(true)
    //     }
    // }

    return (
        <>
            <Helmet>
                <title>Forum | Login</title>
            </Helmet>
            <div className=" bg-base-200 ">
                <div className=" sm:flex-col md:flex justify-center  items-center mx-auto py-8">
                    <div className="text-center md:w-1/2 ">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="text-lg mt-4">Login to your account to continue.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 mt-4">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div> */}
                            <div className="form-control mt-6">
                               
                                <input disabled={false} className="btn bg-lime-500 bg-opacity-50" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='px-6'><small className='text-xl font-semibold hover:bg-lime-500'>New Here? <Link to="/register">Create an account</Link> </small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
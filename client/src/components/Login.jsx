import Logo from "../assets/logo-t.png";
import { LoginValidation } from '../validations/LoginValidation';
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { login, resetState } from '../features/UserSlice';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const message=useSelector((state)=>state.user.message);
    const isSuccess=useSelector((state)=>state.user.isSuccess);
    const navigate=useNavigate();
    const {
        register,
        handleSubmit:submitForm,
        formState:{errors}
    }=useForm({resolver:yupResolver(LoginValidation)});

    const handleSubmit=()=>{
       const udata={email,password};
       dispatch(login(udata));
    }

   
    const handleGuest = () => {
        localStorage.removeItem("user");
        navigate("/home");
    };

    useEffect(() => {
        dispatch(resetState());
    }, []);

    useEffect(() => {
        if (message === "success" && isSuccess) {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user);

            if (user?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }

            dispatch(resetState());
        }
    }, [message, isSuccess]);

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-side">
                    <img src={Logo} className="auth-logo" alt="Epic Trails" />
                    <h2>EPIC TRAILS</h2>
                    <p>Welcome back, explorer. Your next trail is waiting.</p>
                </div>

                <div className="auth-form-wrap">
                    <h1>Welcome Back</h1>
                    <p className="auth-sub">Sign in to continue your adventure</p>

                    <form className="auth-form" onSubmit={submitForm(handleSubmit)}>

                        {message && message !== "success" && (
                            <p className="auth-message">{message}</p>
                        )}

                        <div className="auth-field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                {...register("email",{
                                    onChange:(e)=>setEmail(e.target.value)
                                })}
                            />
                            <small className="auth-error">{errors.email?.message}</small>
                        </div>

                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                {...register("password",{
                                    onChange:(e)=>setPassword(e.target.value)
                                })}
                            />
                            <small className="auth-error">{errors.password?.message}</small>
                        </div>

                        <div className="auth-row">
                            <label className="auth-check">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>

                        <button type="submit" className="auth-btn">SIGN IN</button>

                      
                        <div className="auth-divider">OR</div>
                        <button type="button" className="auth-guest" onClick={handleGuest}>
                            CONTINUE AS GUEST
                        </button>

                        <p className="auth-switch">
                            No account? <Link to="/register">Sign Up</Link> now
                        </p>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default Login;
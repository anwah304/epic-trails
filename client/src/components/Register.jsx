import Logo from '../assets/logo-t.png';
import { RegisterValidation } from '../validations/RegisterValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/UserSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [username,setUName]=useState("");
    let [profilepic,setPP]=useState("");
    let [gender,setGender]=useState("");
    const dispatch=useDispatch();
    const message=useSelector((state)=>state.user.message);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(RegisterValidation)});

    const onSubmit = (data) => {
        const udata={email,username,password,profilepic,gender};
        dispatch(addUser(udata));
    };

    return (
       
        <div className="auth-page">
            <div className="auth-card">

               
                <div className="auth-side">
                    <img src={Logo} className="auth-logo" alt="Epic Trails" />
                    <h2>EPIC TRAILS</h2>
                    <p>Join us and discover the most beautiful hiking trails in Oman.</p>
                </div>

               
                <div className="auth-form-wrap">
                    <h1>Create Account</h1>
                    <p className="auth-sub">Start your journey in a few seconds</p>

                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="auth-grid">

                            <div className="auth-field">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    {...register('name',{
                                        onChange:(e)=>setUName(e.target.value)
                                    })}
                                />
                                <small className="auth-error">{errors.name?.message}</small>
                            </div>

                            <div className="auth-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    {...register('email',{
                                        onChange:(e)=>setEmail(e.target.value)
                                    })}
                                />
                                <small className="auth-error">{errors.email?.message}</small>
                            </div>

                            <div className="auth-field">
                                <label>Gender</label>
                                <select
                                    {...register('gender',{
                                        onChange:(e)=>setGender(e.target.value)
                                    })}
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <small className="auth-error">{errors.gender?.message}</small>
                            </div>

                            <div className="auth-field">
                                <label>Profile Picture URL <span>(optional)</span></label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    onChange={(e)=>setPP(e.target.value)}
                                />
                                <small className="auth-error"></small>
                            </div>

                            <div className="auth-field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="At least 6 characters"
                                    {...register('password',{
                                        onChange:(e)=>setPassword(e.target.value)
                                    })}
                                />
                                <small className="auth-error">{errors.password?.message}</small>
                            </div>

                            <div className="auth-field">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Repeat password"
                                    {...register('confirmPassword')}
                                />
                                <small className="auth-error">{errors.confirmPassword?.message}</small>
                            </div>

                        </div>

                        <button type="submit" className="auth-btn">REGISTER</button>

                        {message && <p className="auth-message">{message}</p>}

                        <p className="auth-switch">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};
export default Register;
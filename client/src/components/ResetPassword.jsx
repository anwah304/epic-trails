import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-t.png";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || "");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(60); 

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleResend = async () => {
        setError("");
        setMessage("");
        try {
            await axios.post("http://localhost:3004/forgot-password", { email });
            setMessage("A new code has been sent if the email is registered.");
            setCooldown(60);
        } catch (err) {
            setError("Could not resend the code.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }
        if (!/^\d{6}$/.test(otp)) {
            setError("Enter the 6-digit code");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (password !== confirm) {
            setError("Passwords must match");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3004/reset-password", {
                email,
                otp,
                password,
            });
            setMessage(res.data.message + ". Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-side">
                    <img src={Logo} className="auth-logo" alt="Epic Trails" />
                    <h2>EPIC TRAILS</h2>
                    <p>Enter the code we sent you and choose a new password.</p>
                </div>

                <div className="auth-form-wrap">
                    <h1>Verify & Reset</h1>
                    <p className="auth-sub">The code is valid for 10 minutes</p>

                    <form className="auth-form" onSubmit={handleSubmit}>

                        {message && <p className="auth-message success">{message}</p>}
                        {error && <p className="auth-message error">{error}</p>}

                        <div className="auth-field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <small className="auth-error"></small>
                        </div>

                        <div className="auth-field">
                            <label>Verification Code</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={6}
                                className="auth-otp"
                                placeholder="------"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            />
                            <small className="auth-error"></small>
                        </div>

                        <div className="auth-field">
                            <label>New Password</label>
                            <input
                                type="password"
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <small className="auth-error"></small>
                        </div>

                        <div className="auth-field">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Repeat password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                            <small className="auth-error"></small>
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "SAVING..." : "RESET PASSWORD"}
                        </button>

                        <p className="auth-switch">
                            Didn't get the code?{" "}
                            <button
                                type="button"
                                className="auth-link-btn"
                                onClick={handleResend}
                                disabled={cooldown > 0}
                            >
                                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                            </button>
                        </p>

                        <p className="auth-switch">
                            <Link to="/login">Back to Login</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ResetPassword;
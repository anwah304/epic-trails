import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/logo-t.png";

const ResetPassword = () => {
    const { token } = useParams(); // الكود السري من الرابط
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

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
            const res = await axios.post(
                `http://localhost:3004/reset-password/${token}`,
                { password }
            );
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
                    <p>Choose a new password and get back to exploring.</p>
                </div>

                <div className="auth-form-wrap">
                    <h1>New Password</h1>
                    <p className="auth-sub">Enter your new password below</p>

                    <form className="auth-form" onSubmit={handleSubmit}>

                        {message && <p className="auth-message success">{message}</p>}

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
                            <small className="auth-error">{error}</small>
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "SAVING..." : "RESET PASSWORD"}
                        </button>

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
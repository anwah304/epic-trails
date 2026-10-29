import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // ✅ أضفنا useNavigate
import Logo from "../assets/logo-t.png";

const ForgotPassword = () => {
    const navigate = useNavigate(); // ✅ جديد
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetToken, setResetToken] = useState(""); // ✅ جديد: الزر يظهر لما يكون فيه قيمة

    // ✅ جديد: لو غيّرتي الإيميل، يختفي الزر والرسائل
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setResetToken("");
        setMessage("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setResetToken(""); // ✅ جديد

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3004/forgot-password", { email });

            // ✅ تغيّر: نعالج الحالات الثلاث
            if (res.data.exists === false) {
                setError(res.data.message);           // الإيميل غير مسجل
            } else if (res.data.exists === true && res.data.token) {
                setMessage(res.data.message);
                setResetToken(res.data.token);        // يظهر الزر (الوضع التجريبي)
            } else {
                setMessage(res.data.message);         // الوضع الآمن: رسالة عامة
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
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
                    <p>No worries, we will help you get back on the trail.</p>
                </div>

                <div className="auth-form-wrap">
                    <h1>Forgot Password</h1>
                    <p className="auth-sub">Enter your email to continue</p> {/* ✅ تغيّر النص */}

                    <form className="auth-form" onSubmit={handleSubmit}>

                        {message && <p className="auth-message success">{message}</p>}

                        <div className="auth-field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleEmailChange} // ✅ تغيّر
                            />
                            <small className="auth-error">{error}</small>
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "CHECKING..." : "CHECK EMAIL"} {/* ✅ تغيّر النص */}
                        </button>

                        {/* ✅ جديد: الزر يظهر بعد التحقق من الإيميل */}
                        {resetToken && (
                            <button
                                type="button"
                                className="auth-btn auth-btn-go"
                                onClick={() => navigate(`/reset-password/${resetToken}`)}
                            >
                                RESET PASSWORD NOW →
                            </button>
                        )}

                        <p className="auth-switch">
                            Remembered it? <Link to="/login">Back to Login</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-t.png";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:3004/forgot-password", { email });
            navigate("/reset-password", { state: { email } });
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
                    <p className="auth-sub">Enter your email and we will send you a 6-digit code</p>

                    <form className="auth-form" onSubmit={handleSubmit}>

                        <div className="auth-field">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <small className="auth-error">{error}</small>
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? "SENDING..." : "SEND CODE"}
                        </button>

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
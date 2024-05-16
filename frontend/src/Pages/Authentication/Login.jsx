import React from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/restaurant/auth/login",
                { email, password }
            );
            toast.success(data.message);
            setEmail("");
            setPassword("");
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <section className="reservation" id="reservation" style={{ height: "100vh" }}>
            <div className="container">
                <div className="banner" style={{ width: "100%" }}>
                    <div className="reservation_form_box">
                        <h1>Login Account</h1>
                        <p> </p>
                        <form>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="email_tag"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="password_tag"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" onClick={handleLogin}>
                                Login{" "}
                                <span>
                                    <HiOutlineArrowNarrowRight />
                                </span>
                            </button>
                            <p>Create a new account: <a href="/register">Create Account</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

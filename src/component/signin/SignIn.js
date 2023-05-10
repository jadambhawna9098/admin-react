import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../../redux/User-Slice";
import { ToastContainer, toast } from "react-toastify";
import apiPoint from "../../api/Web-Api";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isReset, setIsReset] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleForgotPassword = async (event) => {
        try {
            event.preventDefault();
            if (!email) {
                toast.error("Please enter your email");
                return;
            }
            const response = await axios.post(apiPoint.USER_FORGOT_PASSWORD, { email });
            if (response.status === 200) {
                toast.success("Password reset email sent!");
                navigate("/reset-password");
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to send reset email");
        }
    };


    const handleResetPassword = async (event) => {
        try {
          event.preventDefault();
          if (!password || !confirmPassword) {
            toast.error("Please enter a new password and confirm it");
            return;
          }
          if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
          }
      
          const response = await axios.post(apiPoint.USER_RESET_PASSWORD, {
            password
          });  
      
          if (response.status === 200) {
            toast.success("Password reset successful!");
            navigate("/signin");
          }
        } catch (err) {
          console.log(err);
          toast.error("Failed to reset password");
        }
      };
      

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(apiPoint.USER_SIGNIN, { email, password });
            dispatch(setUser(response.data.user));
            navigate("/");
        }
        catch (err) {
            toast.error("Invalid email or password");
        }
    };
    return (
        <>
            <ToastContainer />
            <Header />
            <div className="container mt-5 py-5 ">
                <div className="row p-4  border border-2 rounded-4 align-items-center justify-content-center">
                    <div className="col-5">
                        {isReset ? (
                            <form className="form-group" onSubmit={handleResetPassword}>
                                <div>
                                    <h1 className="font-weight-bold">Reset Password</h1>
                                    <hr />
                                    <label><b>New Password</b></label>
                                    <input
                                        onChange={(event) => setPassword(event.target.value)}
                                        type="password"
                                        placeholder="Enter New Password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                    />
                                    <br />
                                    <label><b>Confirm Password</b></label>
                                    <input
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        type="password"
                                        placeholder="Confirm New Password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                    />
                                    <br />
                                    <button type="submit" className="btn btn-primary my-3 me-3">
                                        Reset Password
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form className="form-group" onSubmit={handleSubmit}>
                                <div>
                                    <h1 className="font-weight-bold">Login</h1>
                                    <hr />
                                    <label><b>Email</b></label>
                                    <input onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter your Email" className="form-control" name="email" value={email} />
                                    <br />
                                    <label><b>Password</b></label>
                                    <input onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter Password" className="form-control" name="password" value={password} />
                                    <br />
                                    <Link to="/reset-password" onClick={handleForgotPassword} style={{ fontSize: "13px", textDecoration: "underline" }}>forgot password ?</Link>
                                    <br />
                                    <div>
                                        <button type="submit" className="btn btn-primary my-3 me-3">Sign In</button>
                                        <Link to="/signup" style={{ fontSize: "13px" }}> Create new account</Link>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="col-lg-5">
                        <img src="assets/img/signin2.avif" className="img-fluid" style={{ height: "auto", width: "100%" }} alt="images" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
    
}
export default SignIn;
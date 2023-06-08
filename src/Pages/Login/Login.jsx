import React, { useContext, useEffect, useState } from "react";
import authImage from "../../assets/login/authentication.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const { signIn } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password).then((result) => {
      const currentUser = result.user;
      console.log(currentUser);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1600,
      });
      form.reset();
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (validateCaptcha(value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div
        style={{
          backgroundImage: "url(https://i.ibb.co/xLMw8Xw/login-bg.png)",
        }}
        className="hero min-h-screen"
      >
        <div className="hero-content flex-col lg:flex-row border-2 border-gray-300 border-b-4 border-r-4 shadow-2xl p-10">
          <div className="text-center lg:text-left w-1/2">
            <img src={authImage} alt="Login Authentication Image" />
          </div>
          <form
            onSubmit={handleLogin}
            className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl"
          >
            <div className="card-body">
              <h1 className="text-5xl font-bold mb-5">Login now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered bg-inherit"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-inherit"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Type the above text"
                  className="input input-bordered bg-inherit"
                />
                {/* <button className="btn btn-outline btn-xs mt-3">
                  Validate
                </button> */}
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled}
                  className="btn btn-warning"
                  type="submit"
                  value="Login"
                />
              </div>
            </div>
            <div>
              <p className="text-center mb-3">
                New to here?{" "}
                <Link to="/register" className="text-yellow-500 font-bold">
                  Create New Account
                </Link>
              </p>
              <div className="divider w-1/2 mx-auto">Or Continue in with</div>
              <div className="w-full mx-auto mb-10">
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

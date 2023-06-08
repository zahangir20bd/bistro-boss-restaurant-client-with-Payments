import React, { useContext } from "react";
import authImage from "../../assets/login/authentication.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password).then((result) => {
      const currentUser = result.user;
      // console.log(currentUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const savedUser = { name: data.name, email: data.email };

          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(savedUser),
          })
            .then((res) => res.json())
            .then((data) => {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "New User Created Successfully",
                showConfirmButton: false,
                timer: 1600,
              });
              navigate("/");
            });
        })
        .catch((error) => console.log(error));
    });
  };

  //   console.log(watch("example"));

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Register</title>
      </Helmet>
      <div
        style={{
          backgroundImage: "url(https://i.ibb.co/xLMw8Xw/login-bg.png)",
        }}
        className="hero min-h-screen"
      >
        <div className="hero-content flex-col lg:flex-row-reverse border-2 border-gray-300 border-b-4 border-r-4 shadow-2xl p-10">
          <div className="text-center lg:text-left w-1/2">
            <img src={authImage} alt="Login Authentication Image" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl"
          >
            <div className="card-body">
              <h1 className="text-5xl font-bold mb-5">Register</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Your name"
                  className="input input-bordered bg-inherit"
                />
                {errors.name && (
                  <span className="text-red-700">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="Your email"
                  className="input input-bordered bg-inherit"
                />
                {errors.email && (
                  <span className="text-red-700">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-inherit"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-700">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-700">
                    Password must be more then 8 character
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-700">
                    Password must be more within 20 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-700">
                    Password must have one uppercase, one lowercase, one number
                    and one special character
                  </span>
                )}
                {/* {errors.password && (
                <span className="text-red-700">{errors.password?.message}</span>
              )} */}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo url"
                  className="input input-bordered bg-inherit"
                />
                {errors.photoURL && (
                  <span className="text-red-700">Photo Url is required</span>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-warning"
                  type="submit"
                  value="Register"
                />
              </div>
            </div>
            <div>
              <p className="text-center mb-3">
                Have an account?{" "}
                <Link to="/login" className="text-yellow-500 font-bold">
                  Go to Login
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

export default Register;

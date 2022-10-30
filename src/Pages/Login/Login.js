import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Shared/Header/Header";
import { AiFillGoogleCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { AuthContext } from "../../contexts/UserContext";

const Login = () => {
  const [error, setError] = useState("");
  const [succTost, setsuccTost] = useState("");
  const { singIn, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleSingIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    singIn(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log(user);
        setsuccTost("Login Success Fully", {
          position: "top-center",
          autoClose: 3000,
        });
        //  navigate(from, { replace: true });
        setError("");
        if (user.emailVerified) {
          navigate(from, { replace: true });
        } else {
          toast.error("Please Verified Your Email", {
            position: "top-center",
            autoClose: 3000,
          });
        }
        form.reset();
        // navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(
          toast.error(errorMessage, {
            position: "top-center",
            autoClose: 3000,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <Header></Header>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse mt-[-60px] bg-slate-400 rounded-2xl shadow-2xl">
          <div className="text-center lg:text-left">
            {error}
            {succTost}
            <h1 className="text-5xl font-bold text-slate-200">Login now!</h1>
            <p className="py-6 text-white ">
              If you are already a member of our website then login from here.
              If not, please register.
            </p>
          </div>
          <div className="card flex-shrink-0 w-fullshadow-2xl bg-base-100">
            <form onSubmit={handleSingIn}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="Password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <Link href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <p className="mt-2 text-gray-500">
                  No account yet?
                  <Link to="/registration">
                    <code className="text-pink-500"> SignUp Now</code>
                  </Link>
                </p>
                <div className="divider">OR</div>

                <div className="socialAccount grid grid-cols-3 gap-2">
                  <div className="google ">
                    <Link>
                      <button className="btn gap-2 cursor-pointer btnGoogle">
                        <label>
                          <AiFillGoogleCircle className="" />
                        </label>
                        <p>Google</p>
                      </button>
                    </Link>
                  </div>
                  <div className="github">
                    <Link>
                      <button className="btn gap-2 cursor-pointer btnGithub">
                        <AiFillGoogleCircle className="" />
                        GitHub
                      </button>
                    </Link>
                  </div>
                  <div className="facebook">
                    <Link>
                      <button className="btn gap-2 cursor-pointer btnFacebook">
                        <AiFillGoogleCircle className="" />
                        Facebook
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import book from "../assets/blue-book.jpg";

const ValidatedLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/profile/login", {
        email,
        password,
      });

      Cookies.set("jwt", response.data.jwt, { expires: 1 });
      Cookies.set("userId", response.data.profileId, { expires: 1 });
      // localStorage.setItem("usercompleted", response.data.usercompleted);
      // localStorage.setItem("hrcompleted", response.data.hrcompleted);
      // localStorage.setItem("hrStatus", response.data.hrStatus);
      localStorage.setItem("role", response.data.role);

      setEmail("");
      setPassword("");
      navigateAfterLogin();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password");
    }
  };

  const validateForm = () => {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    });

    try {
      schema.validateSync({ email, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const navigateAfterLogin = () => {
    const role = localStorage.getItem("role");
    // const usercompleted = localStorage.getItem("usercompleted");
    // const hrcompleted = localStorage.getItem("hrcompleted");

    if (role === "admin") {
      navigate("/");
    } else if (role === "book_owner") {
      navigate(`/UpdateUser/${Cookies.get("userId")}`);
    }
  };

  return (
    <div className="flex items-center h-screen">
      <div className="w-1/2 bg-blue-950 flex items-center justify-center shadow-md h-screen">
        <img src={book} width={300} height={70} alt="Book" />
      </div>
      <div className="w-1/2 bg-white px-8 mb-4">
        <div className="flex items-center space-x-4 ml-4">
          <img src={book} width={30} height={30} alt="Book" />
          <p className="text-2xl">Book Rent</p>
        </div>

        <p className="mt-4 text-2xl">Login</p>
        <hr />
        {errors.login && (
          <div className="text-red-500 text-sm text-center">{errors.login}</div>
        )}
        <form onSubmit={handleSubmit} className="mx-auto mt-8">
          <div className="mb-4">
            <fieldset
              className={`border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            >
              <legend className={`text-xs px-2  "text-gray-700`}>
                Email address
              </legend>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 focus:outline-none"
              />
            </fieldset>
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}

            <fieldset
              className={`border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            >
              <legend className={`text-xs px-2  "text-gray-700`}>
                Password
              </legend>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-0 focus:outline-none"
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
            </fieldset>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
            <div className="mt-3">
              <input type="checkbox" name="check" />
              <label> Remember me</label>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-400 text-white font-bold py-1 px-40 rounded w-full"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className="text-center justify-between">
          {/* <Link to="/forgotpassword" className="text-sm text-blue-500">
        Forgot Password?
      </Link> */}
          <span className="text-sm">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-400">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ValidatedLoginForm;

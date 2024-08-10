/* eslint-disable no-unused-vars */
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import book from "../assets/blue-book.jpg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("book_owner");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [location, setLocation] = useState("");
  const [phoneNo, setPhoneNo] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await fetch("/api/profile/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
          phoneNo,
          location,
        }),
      });
      toast.success("Sign up successful. Please log in.");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already in use");
      } else {
        toast.error("Failed to sign up. Please try again later.");
      }
      console.error(error);
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
      confirmPassword: Yup.string()
        .oneOf([password], "Passwords must match")
        .required("Confirm Password is required"),
      phoneNo: Yup.string().required("Phone number is required"),
      location: Yup.string().required("Location is required"),
    });

    try {
      schema.validateSync(
        { email, password, confirmPassword, phoneNo, location },
        { abortEarly: false }
      );
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
        <p className="mt-4 text-2xl">Signup as Owner</p>
        <hr />
        <form onSubmit={handleSubmit} className=" mx-auto mt-8">
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
            <fieldset
              className={`border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            >
              <legend className={`text-xs px-2  "text-gray-700`}>
                Confirm Password
              </legend>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-0 focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
            </fieldset>
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword}
              </div>
            )}
            <fieldset
              className={`border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            >
              <legend className={`text-xs px-2  "text-gray-700`}>
                Location
              </legend>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border-0 focus:outline-none"
              />
            </fieldset>
            {errors.location && (
              <div className="text-red-500 text-sm">{errors.location}</div>
            )}
            <fieldset
              className={`border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.phoneNo ? "border-red-500" : "border-gray-300"
              }`}
            >
              <legend className={`text-xs px-2  "text-gray-700`}>
                Phone No.
              </legend>
              <input
                id="phoneNo"
                name="phoneNo"
                type="number"
                placeholder="Enter your Phone No."
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full border-0 focus:outline-none"
              />
            </fieldset>
            {errors.phoneNo && (
              <div className="text-red-500 text-sm">{errors.phoneNo}</div>
            )}
            <div className="mt-3">
              <input type="checkbox" name="check" />
              <label className="text-right">
                {" "}
                I accept the Terms and Conditions
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-400 hover:bg-blue-400 w-full text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center justify-between">
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-400">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

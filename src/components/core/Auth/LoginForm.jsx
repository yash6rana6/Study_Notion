import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../../Services/operations/authAPI";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <form onSubmit={submitHandler} className="mt-6 flex w-full flex-col gap-y-4">
      <label htmlFor="email">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email<sup className="text-pink-200">*</sup>
        </p>
      </label>
      <input
        type="text"
        required
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={onChangeHandler}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
      />
      <label htmlFor="password">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password<sup className="text-pink-200">*</sup>
        </p>
      </label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={onChangeHandler}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          )}
        </span>
      </div>

      <Link to="/forgot-password">
        <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
          Forget Password
        </p>
      </Link>

      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;

import { useState, ChangeEvent, FormEvent } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Interface for user credentials
interface Credentials {
  email: string;
  password: string;
  confirmPassword: string;
}

// Signup component for user registration
const Signup: React.FC = () => {
  // State for user credentials and errors
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // React.js router instance
  const router = useNavigate();

  // Handle input changes
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((pre) => ({ ...pre, [name]: value }));
  };

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle user signup
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateEmail(credentials.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }
    if (credentials.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should be at least 6 characters",
      }));
      return;
    }
    if (credentials.password !== credentials.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      if (res.user) {
        router("/");
      }
    } catch (error) {
      console.log("Signup ERROR", error);
    }
  };

  // Handle user signup with Google
  const handleSignupWithGoogle = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        router("/");
      }
    } catch (error) {
      console.log("Signup ERROR", error);
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex lg:flex-row bg-sky-50 flex-col-reverse ">
      {/* Left Section */}
      <div className="flex justify-center items-center w-full lg:w-[50%] bg-slate-900">
        <div className="w-full">
          <img
            width={50}
            height={50}
            className="w-full cursor-pointer"
            alt="gif"
            src={"/gifimg.gif"}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="container flex-1  max-w-md mx-auto flex flex-col items-center justify-center px-2 ">
        <h1 className="text-neutral-900 text-4xl text-start w-full font-bold font-['Open Sans']">
          Welcome!
        </h1>

        {/* Email */}
        <div className="mt-8 w-full flex flex-col gap-1">
          <label className="text-neutral-600 text-base font-normal font-['Open Sans']">
            Email Address
          </label>
          <input
            type="text"
            className={`block text-black text-lg border-grey-light w-full p-2 px-4  rounded-[7px] border border-neutral-400 ${
              errors.email && "border-red-500"
            }`}
            name="email"
            placeholder="Enter Valid Email"
            value={credentials.email}
            onChange={(e) => handleOnchange(e)}
          />

          <p className="text-red-500 min-h-6 text-sm">{errors?.email}</p>
        </div>

        {/* Password */}
        <div className="mb-4 relative w-full flex flex-col gap-1">
          <label className="text-neutral-600 text-base font-normal font-['Open Sans'] mb-2">
            Password
          </label>
          <input
            type="password"
            className={`block text-black text-lg border-grey-light w-full p-2 px-4 rounded-[7px] border border-neutral-400 ${
              errors.password && "border-red-500"
            }`}
            name="password"
            placeholder="Enter Password"
            value={credentials.password}
            onChange={(e) => handleOnchange(e)}
          />

          <p className="text-red-500 text-sm min-h-6">{errors?.password}</p>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative w-full flex flex-col gap-1">
          <label className="text-neutral-600 text-base font-normal font-['Open Sans'] mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            className={`block text-lg text-black border-grey-light w-full p-2 px-4  mb-1 rounded-[7px] border border-neutral-400 ${
              errors.confirmPassword && "border-red-500"
            }`}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={(e) => handleOnchange(e)}
          />

          <p className="text-red-500 text-sm min-h-6">
            { errors?.confirmPassword}
          </p>
        </div>

        {/* TERMS AND CONDITION */}
        <div className="w-[450px] text-center">
          <span className="text-neutral-600 text-base font-normal font-['Inter']">
            By signing up you agree with
          </span>
          <span className="text-blue-600 text-base font-normal font-['Inter']">
            {" "}
            terms and conditions
          </span>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full text-center py-3 my-5 text-white rounded bg-slate-800  text-xl font-normal font-['Inter']  hover:scale-105 transition-all focus:outline-none "
          onClick={handleSignup}
        >
          Sign up
        </button>

        {/* Sign In With */}
        <div className="flex gap-2 justify-center items-center">
          <div className="w-[140px] h-[0px] border border-zinc-300"></div>
          <span className="text-neutral-600 text-xl font-normal font-['Open Sans']">
            Or Sign in with
          </span>
          <div className="w-[140px] h-[0px] border border-zinc-300"></div>
        </div>

        {/* Sign In Images */}
        <div className="flex justify-around w-full my-5">
          <img
            width={40}
            height={40}
            alt="google"
            src={"/google.png"}
            onClick={handleSignupWithGoogle}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
          <img
            width={40}
            height={40}
            alt="facebook"
            src={"/meta.png"}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
          <img
            width={40}
            height={40}
            alt="apple"
            src={"/apple.png"}
            className="cursor-pointer hover:scale-105 transition-transform"
          />
        </div>

        {/* Log In Button */}
        <div className="flex gap-2">
          <span className="text-neutral-600 text-xl font-normal font-['Open Sans']">
            Already have an account?
          </span>
          <span className="text-blue-600 text-xl font-normal font-['Inter']">
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

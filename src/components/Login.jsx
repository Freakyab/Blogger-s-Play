import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGoogle } from "react-icons/fa";
// import { AiFillGithub } from 'react-icons/ai';
import Loader from "@/components/loader";

const LoginPopup = ({ onClose }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("google", {
      callbackUrl: `${window.location.origin}`,
    });
    onClose();
    if (res?.error) {
      toast.error(res.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } else if (res?.url) {
      setLoading(false);
      router.push("/");
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false, // Disable automatic redirect
    });
    onClose();
    if (res?.error) {
      toast.error(res.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } else if (res?.url) {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="z-10 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-10 rounded-lg shadow-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <span className="inline-flex">
              <h1 className="text-4xl font-bold text-center">Login</h1>
            </span>

            <form className="flex flex-col mt-10">
              <input
                type="text"
                placeholder="Username"
                className="border-2 border-slate-900 rounded-lg p-2 mb-5"
                name="username"
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                }}
              />

              <input
                type="password"
                placeholder="Password"
                className="border-2 border-slate-900 rounded-lg p-2 mb-5"
                name="password"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
              />

              <button
                className="bg-slate-900 text-white rounded-lg p-2 mb-2"
                onClick={handleLogin}>
                Login
              </button>
              <button
                onClick={handleLoginGoogle}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
                <FaGoogle className="google-icon mr-2" />
                Sign In with Google
              </button>
              {/* <button
                onClick={handleLoginGithub}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
              >
                <AiFillGithub className="github-icon mr-2" />
                Sign In with Github
              </button> */}
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default LoginPopup;

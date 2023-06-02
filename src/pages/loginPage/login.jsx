import React, { useState } from 'react';

// next auth annd Router 
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

// components
import Loader from '@/components/loader';
import { FaGoogle } from 'react-icons/fa';

// toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ button, showLogin }) => {

  // state
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  // next auth and router
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn('credentials', {
      username: form.username,
      password: form.password,
      redirect: false, // Disable automatic redirect
    });


    if (res?.error) {
      toast.error(res.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,

      });
      router.push('/');
      setLoading(false);
    } else if (res?.url) {
      router.push('/dashboard');
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center h-screen bg-slate-900">
          <div className="bg-white p-10 rounded-lg shadow-2xl">
            <span className="inline-flex">
              <h1 className="text-4xl font-bold text-center">Login |</h1>
              <h1
                className="text-3xl font-bold text-center text-slate-900 cursor-pointer pt-2"
                onClick={() => {
                  button(!showLogin);
                }}
              >
                Signup
              </h1>
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
                className="bg-slate-900 text-white rounded-lg p-2"
                onClick={handleLogin}
              >
                Login
              </button>
              <button onClick={() => signIn()} className="mt-2 flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
                <FaGoogle className="google-icon mr-2" />
                Sign In with Social Media
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;

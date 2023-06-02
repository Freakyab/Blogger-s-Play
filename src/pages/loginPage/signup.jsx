import React, { useState } from 'react';

// next auth annd Router
import Router from 'next/router'
import { signIn } from 'next-auth/react'

// components
import Loader from "@/components/loader"

// toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = ({ button, showLogin }) => {

    // state
    const [form, setForm] = useState({ username: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        setLoading(true)
        const res = await signIn("credentials", {
            username: form.username,
            password: form.password,
            name: form.name,
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
            Router.push("/");
            setLoading(false);
        } else if (res?.url) {
            Router.push("/dashboard");
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
                        <span className='inline-flex'>
                            <h1 className="text-4xl font-bold text-center">
                                Signup |
                            </h1>

                            <h1 className="text-3xl font-bold text-center text-slate-900 cursor-pointer pt-2"
                                onClick={() => {
                                    button(!showLogin)
                                }}
                            >
                                Login

                            </h1>
                        </span>
                        <form className="flex flex-col mt-10">
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => { setForm({ ...form, username: e.target.value }) }}
                                className="border-2 border-slate-900 rounded-lg p-2 mb-5" />

                            <input
                                type="password"
                                placeholder="Password"
                                className="border-2 border-slate-900 rounded-lg p-2 mb-5"
                                onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                className="border-2 border-slate-900 rounded-lg p-2 mb-5"
                                onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
                            />
                            <button
                                className="bg-slate-900 text-white rounded-lg p-2"
                                onClick={handleSignup}
                            >
                                signup
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};
export default signup;
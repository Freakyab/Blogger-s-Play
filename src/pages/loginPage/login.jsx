import React, { useState } from 'react';
import HomePage from "@/components/homePage"
import Loader from "@/components/loader"
const login = ({ button, showLogin }) => {
    const [form, setForm] = useState({ username: "", password: "" })
    const [userData, setUserData] = useState({ id: "", name: "" })
    const [dashboard, setDashboard] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleLogin = (e) => {
        setLoading(true)
        e.preventDefault();
        fetch("https://blogger-play.vercel.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setUserData({ id: data.id, name: data.name })
                    setDashboard(true)
                }
                setLoading(false)
            })
    }

    return (
        <>{loading ? <Loader /> :
            <>

                {dashboard ? <HomePage data={userData} /> :
                    <div className="flex justify-center items-center h-screen bg-slate-900">
                        <div className="bg-white p-10 rounded-lg shadow-2xl">
                            <span className='inline-flex'>
                                <h1 className="text-4xl font-bold text-center"

                                >Login |</h1>
                                <h1 className="text-3xl font-bold text-center text-slate-900 cursor-pointer pt-2"
                                    onClick={() => {
                                        button(!showLogin)
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

                                <button className="bg-slate-900 text-white rounded-lg p-2"
                                    onClick={handleLogin}
                                >Login</button>
                            </form>
                        </div>
                    </div>}
            </>
        }
        </>
    );
}

export default login;
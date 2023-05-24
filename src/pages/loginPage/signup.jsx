import React, { useState } from 'react';
import HomePage from "@/components/homePage"
const signup = ({ button, showLogin }) => {
    const [form, setForm] = useState({ username: "", password: "", name: "" })
    const [userData, setUserData] = useState({ id: "", name: "" })
    const [dashboard, setDashboard] = useState(false)
    const handleSignup = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
                name: form.name
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setUserData({ id: data.id, name: data.name })
                    setDashboard(true)
                }
            })
    }
    return (
        <>
            {dashboard ? <HomePage data={userData} /> :
                <div className="flex justify-center items-center h-screen bg-slate-900">
                    <div className="bg-white p-10 rounded-lg shadow-2xl">
                        <span className='inline-flex'>
                            <h1 className="text-4xl font-bold text-center"

                            >Signup |</h1>
                            <h1 className="text-3xl font-bold text-center text-slate-900 cursor-pointer pt-2"
                                onClick={() => {
                                    button(!showLogin)
                                }}
                            >
                                Login
                            </h1>
                        </span>
                        <form className="flex flex-col mt-10">
                            <input type="text" placeholder="Username"
                                onChange={(e) => { setForm({ ...form, username: e.target.value }) }}
                                className="border-2 border-slate-900 rounded-lg p-2 mb-5" />
                            <input type="password" placeholder="Password" className="border-2 border-slate-900 rounded-lg p-2 mb-5"
                                onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                            />
                            <input type="text" placeholder="Name" className="border-2 border-slate-900 rounded-lg p-2 mb-5"
                                onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
                            />
                            <button className="bg-slate-900 text-white rounded-lg p-2"
                                onClick={handleSignup}

                            >signup</button>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default signup;
import React, { useState, useEffect } from 'react';

// next auth and Router
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

// components
import Navbar from '@/components/navbar';
import Loader from "@/components/loader"

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const MyBlogs = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    // If the user is not authenticated, redirect to the login page
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session || session == undefined ) {
        router.replace('/');
        return null;
    }
    const { user } = session;
    const { id } = user;

    // state
    const [blogData, setBlogData] = useState({ title: '', blog: '', imgUrl: '', _id: '' });
    const [blogs, setBlogs] = useState([]);
    const [display, setDisplay] = useState(false);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (item) => {
        setBlogData({ title: item.title, blog: item.blog, imgUrl: item.imgUrl, _id: item._id });
        setDisplay(true);
    };

    const handleSubmit = async () => {
        setLoading(true)
        const res = await fetch(`https://blogger-play.vercel.app/updateBlog?`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });
        const data = await res.json();
        if (data.success) {
            toast.success('Blog updated successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            });
        }else{
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            });
        }
        setDisplay(false);
        setUpdate(!update);
        setLoading(false)
    };

    const handleDelete = async (id) => {
        setLoading(true)
        const res = await fetch(`https://blogger-play.vercel.app/deleteBlog?`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) {
            setUpdate(!update);
            toast.success('Blog deleted successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            });
        }else{
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            });
        }
        setLoading(false)
    };

    useEffect(() => {
        const getBlogs = async () => {
            setLoading(true)
            const res = await fetch(`https://blogger-play.vercel.app/myBlogs?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            
            if (data.success) {
                setBlogs(data.Blog);

            }
            else{
                toast.error('Something went wrong', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                });
            }
            setLoading(false);
        };
        getBlogs();
    }, [update]);

    return (
        <>
            {loading ?
                <Loader /> :
                <>
                    <Navbar />
                    {display && (
                        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
                            <div className="bg-white flex flex-col rounded-lg w-[90vw] h-[60vh] p-6">
                                <h2 className="text-2xl font-bold mb-4">Blog details</h2>
                                <input
                                    type="text"
                                    className="mb-4 border border-gray-300 p-2 rounded"
                                    placeholder="Title"
                                    value={blogData.title}
                                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                                />

                                <input
                                    type="text"
                                    className="mb-4 border border-gray-300 p-2 rounded"
                                    placeholder="URL"
                                    value={blogData.imgUrl}
                                    onChange={(e) => setBlogData({ ...blogData, imgUrl: e.target.value })}
                                />

                                <textarea
                                    placeholder="Blog"
                                    className="mb-4 border border-gray-300 p-2 rounded h-full"
                                    value={blogData.blog}
                                    onChange={(e) => setBlogData({ ...blogData, blog: e.target.value })}
                                />

                                <div className="flex justify-center gap-4">
                                    <button
                                        className="bg-blue-500 text-white rounded p-4"
                                        onClick={handleSubmit}
                                    >
                                        Edit Blog
                                    </button>
                                    <button
                                        className="bg-red-500 text-white rounded p-4"
                                        onClick={() => setDisplay(false)}
                                    >
                                        Close Popup
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center items-center h-full flex-col bg-slate-200 shadow-xl">
                        <h1 className="text-3xl font-bold text-black m-5">My Blogs</h1>

                        <div className="grid grid-cols-1 gap-12 px-5 py-10">
                            {blogs.length > 0 ? (
                                blogs.map((item, index) => (
                                    <div key={index} className="bg-white rounded-lg p-3 w-full">
                                        <h1 className="text-2xl font-bold text-slate-900 mb-5">
                                            {item.title}
                                        </h1>
                                        <div className="mb-5 bg-black w-full h-1 rounded-2xl"></div>
                                        <img
                                            src={item.imgUrl}
                                            alt="blogImage"
                                            className="w-full object-cover rounded-lg h-[360px] mb-5"
                                        />
                                        {item.blog.split('\n').map((paragraph, i) => (
                                            <p key={i} className="text-slate-900 text-lg mb-5 font-semibold">
                                                {paragraph}
                                            </p>
                                        ))}
                                        <p className="text-slate-900 text-lg mb-5 font-medium">
                                            Like count: {item.likes ? item.likes.length : 0}
                                        </p>
                                        <p className="text-slate-900 text-lg mb-5 font-medium">
                                            Author: {item.name}
                                        </p>
                                        <div className="flex justify-between">
                                            <button
                                                className="bg-slate-900 text-white rounded-lg p-2"
                                                onClick={() => handleChange(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-slate-900 text-white rounded-lg p-2"
                                                onClick={() => {
                                                    router.push(`/share/${item._id}`);
                                                }}
                                            >
                                                Share
                                            </button>
                                            <button
                                                className="bg-slate-900 text-white rounded-lg p-2"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1 className="text-2xl font-bold text-black m-5">No Blogs</h1>
                            )}
                        </div>
                    </div>
                </>

            }
            <ToastContainer />
        </>
    );
};


export default MyBlogs;

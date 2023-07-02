import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createBlog = ({ blogDisplay, setBlogDisplay }) => {
  const { data: session } = useSession();
  const { user } = session;
  const { id, name } = user;
  const categories = [
    "Food blogs",
    "Travel blogs",
    "Health and fitness blogs",
    "Lifestyle blogs",
    "Fashion and beauty blogs",
    "Photography blogs",
    "Personal blogs",
    "DIY craft blogs",
    "Parenting blogs",
    "Music blogs",
    "Business blogs",
    "Art and design blogs",
    "Book and writing blogs",
    "Personal finance blogs",
    "Interior design blogs",
    "Sports blogs",
    "Movie blogs",
    "Political blogs",
    "Other",
  ];
  const [form, setForm] = useState({
    title: "",
    blog: "",
    imgUrl: "",
    by: id,
    date: new Date(),
    likes: [],
    name: name,
    tags: "Food blogs",
  });


  const handleChange = async (e) => {
    e.preventDefault();
    // const res = await fetch("https://blogger-play.vercel.app/createBlog", {
    const res = await fetch("http://localhost:5000/createBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Blog created successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }

    setBlogDisplay(!blogDisplay);
    setForm({
      title: "",
      blog: "",
      imgUrl: "",
      by: id,
      date: new Date(),
      tags: "Food blogs",
      likes: [],
      name: name,
    });
  };

  return (
    <div>
      {createBlog && (
        <div className="z-9 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white flex flex-col rounded-lg p-6 lg:w-[70vw]">
            <h2 className="text-2xl font-bold mb-4">Blog details</h2>

            <input
              type="text"
              className="mb-4 border border-gray-300 p-2 rounded"
              placeholder="Title"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              type="text"
              className="mb-4 border border-gray-300 p-2 rounded"
              placeholder="Img url"
              onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
            />
            <textarea
              placeholder="blog"
              className="mb-4 border border-gray-300 p-2 rounded"
              onChange={(e) => setForm({ ...form, blog: e.target.value })}
            />
            <select
              placeholder="Enter the tags"
              className="mb-4 border border-gray-300 p-2 rounded appearance-none origin-bottom"
              onChange={(e) => setForm({ ...form, tags: e.target.value })}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleChange}>
              Create Blog
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setBlogDisplay(!blogDisplay)}>
              Close Popup
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default createBlog;

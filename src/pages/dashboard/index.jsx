// React
import React, { useEffect, useState } from "react";

// auth and Router
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Router from "next/router";

// react-icons
import { AiOutlineLike } from "react-icons/ai";

// components
import Navbar from "../../components/navbar";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || session === undefined) {
      router.replace("/");
    }
  }, [status, session, router]);

  const { user } = session || {};
  const { id } = user || {};

  const [blog, setBlog] = useState([]);
  const [createBlog, setCreateBlog] = useState(false);
  const [update, setUpdate] = useState(false);
  const [like, setLike] = useState([]);
  const [categoryContent, setCategoryContent] = useState([]);


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
  ];

  const handleLike = async (postId) => {
    await fetch(`https://blogger-play.vercel.app/like?`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        userId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUpdate(!update);
          if (data.likeCheck === "Liked")
            toast.success(data.likeCheck, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
            });
          else
            toast.error(data.likeCheck, {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategories = async (e) => {
    await fetch("http://localhost:5000/getCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: e }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategoryContent(data.Blog);
        else {
          toast.error("No blog found", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
          });
        }
      });
  };

  useEffect(() => {
    // fetch("https://blogger-play.vercel.app/homePage", {
    fetch("http://localhost:5000/homePage", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.Blog);
        const likes = data.Blog.map((blog) => {
          if (blog.likes.includes(id)) {
            return blog._id;
          }
          return null;
        });
        setLike(likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  return (
    <>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : !session || session === undefined ? null : (
        <>
          <Navbar createBlog={createBlog} setCreateBlog={setCreateBlog} />
          <div className="flex justify-center items-center mt-[100px] sm:m-20 lg:mt-32">
            <div className="w-full max-w-7xl bg-slate-200 rounded-lg shadow-2xl relative scale-105">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-50 lg:rounded-3xl shadow-2xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')",
                }}
              />
              <div className="p-6 relative z-10">
                <h1 className="text-3xl font-bold text-white mb-6">Blog</h1>
                <p className="text-white text-xl mb-16">
                  "Blogging is not just about publishing, it's about sharing
                  your voice with the world." - Unknown
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {blog &&
                    blog.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-4 h-full overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform lg:hover:-translate-y-1 lg:hover:scale-110">
                        <h1 className="text-xl font-bold text-slate-900 mb-4 overflow-hidden text-ellipsis lg:whitespace-nowrap">
                          {item.title}
                        </h1>
                        <p className="text-slate-900 text-lg overflow-hidden h-28 mb-4">
                          {item.blog}
                        </p>
                        <div className="flex items-center justify-between">
                          <button
                            className="bg-slate-900 text-white rounded-lg px-4 py-2"
                            onClick={() => {
                              Router.push(`/share/${item._id}`);
                            }}>
                            More info
                          </button>
                          <div className="flex">
                            <AiOutlineLike
                              className={`text-2xl ml-4 mt-2 ${
                                like.includes(item._id) ? "text-blue-500" : ""
                              }`}
                              onClick={() => handleLike(item._id)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Types of blogs */}
          <div className="grid m-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center mt-5 sm:mt-0 z-100">
              Explore
            </h2>
            <div className="flex justify-center items-center">
              <input
                type="text"
                className="border-2 border-gray-500 rounded-lg p-2 m-2 w-1/2"
                placeholder="Search for blogs type"
              />
              <button className="bg-slate-900 text-white rounded-lg px-4 py-2 m-2">
                Search
              </button>
            </div>
            <div className="sm:m-5">
              {categories.map((category) => (
                <button
                  className="bg-gray-700 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors duration-300 m-2 capitalize hover:"
                  onClick={() => handleCategories(category)}>
                  {category}
                </button>
              ))}
              <div>
                {categoryContent.length !== 0
                  ? categoryContent.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="bg-gray-100 rounded-lg border border-gray-600 p-4 h-full hover:shadow-xl sm:grid grid-cols-2 mt-5">
                            <div className="grid sm:grid-flow-row">
                              <h1
                                className="text-3xl font-bold text-slate-900 mb-4 overflow-hidden text-ellipsis lg:whitespace-nowrap capitalize"
                              >{item.name}</h1> 
                              <h3 className="text-xl font-bold text-slate-900 mb-4 capitalize">
                                {item.title}
                              </h3>
                              <p className="text-slate-900 text-lg overflow-hidden h-28 mb-4">
                                {item.blog}
                              </p>
                              <span className="flex items-center justify-between">
                                <button
                                  className="bg-slate-900 text-white rounded-lg px-4 py-2 mb-4"
                                  onClick={() => {
                                    Router.push(`/share/${item._id}`);
                                  }}>
                                  More info
                                </button>
                              </span>
                            </div>
                            <div
                              className="ml-3 flex-col"
                            >
                              <img
                                className="w-full max-h-72 object-cover mb-4 rounded-lg shadow-2xl"
                                src={item.imgUrl}
                                alt="categoryContentimg"
                              />
                              <span
                                className="m-auto"
                              >
                               <AiOutlineLike
                              className={`text-2xl ml-4 mt-2 ${
                                like.includes(item._id) ? "text-blue-500" : ""
                              }`}
                              onClick={() => handleLike(item._id)}
                            />
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Dashboard;

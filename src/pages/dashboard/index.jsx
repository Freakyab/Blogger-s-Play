// React
import React, { useEffect, useState } from "react";

// auth and Router
import { useSession } from "next-auth/react";
import Router from "next/router";

// react-icons
import { AiOutlineLike } from "react-icons/ai";

// // components
// import Navbar from "../../components/navbar";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { data: session } = useSession();
  // const router = useRouter();

  // const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ user: {}, id: {} });
  const [blog, setBlog] = useState([]);
  const [update, setUpdate] = useState(false);
  const [like, setLike] = useState([]);
  const [categoryContent, setCategoryContent] = useState([]);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    if (session) {
      setForm({ user: session.user.name, id: session.user.id });
      setUpdate(!update);
    }
  }, [session]);

  const handleLike = async (postId) => {
    await fetch(`https://blogger-play.vercel.app/like?`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        userId: form.id,
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

  const handleError = () => {
    toast.error("Please Login to like", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
    // setLoadLogin(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/getQuote", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quote);
        console.log(data.quote);
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (form.user) {
          const likes = data.Blog.map((blog) => {
            if (blog.likes.includes(form.id)) {
              return true;
            }
            return false;
          });
          setLike(likes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  return (
    <>
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
              {/* {console.log()} */}
              {quote[0]?.quote} - {quote[0]?.author}
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
                          onClick={
                            session ? () => handleLike(item._id) : handleError
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;

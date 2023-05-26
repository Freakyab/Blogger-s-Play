import React, { useEffect, useState } from "react";
import CreateBlog from "@/components/createBlog";
import MyBlogs from "@/components/myBlogs";
import Router from "next/router";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import Navbar from "./navbar";

const Home = ({ data }) => {
  const [blog, setBlog] = useState([]);
  const [id, setId] = useState(data.id);
  const [createBlog, setCreateBlog] = useState(false);
  const [myBlogs, setMyBlogs] = useState(false);
  const [update, setUpdate] = useState(false);
  const [like, setLike] = useState([]);

  const handleLike = (postId) => {
    fetch(`https://blogger-play.vercel.app/like?`, {
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("https://blogger-play.vercel.app/homePage", {
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
            return true;
          }
          return false;
        });
        setLike(likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  return (
    <>
      {id === "" ? (
        (window.location.href = "/loginPage")
      ) : !myBlogs ? (
        <>
          <Navbar
            name={data.name}
            id={id}
            setId={setId}
            createBlog={createBlog}
            setCreateBlog={setCreateBlog}
            myBlogs={myBlogs}
            setMyBlogs={setMyBlogs}
          />
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
                <h1 className="text-3xl font-bold text-white mb-6">
                  Blog
                </h1>
                <p className="text-white text-xl mb-16">
                  "Blogging is not just about publishing, it's about sharing
                  your voice with the world." - Unknown
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {blog &&
                    blog.map((item, index) => (
                      <div
                        key={item}
                        className="bg-white rounded-lg p-4 h-full overflow-hidden shadow-xl hover:shadow-2xl transition duration-500 ease-in-out transform lg:hover:-translate-y-1 lg:hover:scale-110"
                      >
                        <h1 className="text-xl font-bold text-slate-900 mb-4 overflow-hidden text-ellipsis lg:whitespace-nowrap" >
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
                            }}
                          >
                            More info
                          </button>
                          <div className="flex">
                            {like && like[index] ? (
                              <AiOutlineDislike
                                className="text-2xl text-slate-900 ml-4 mt-2"
                                onClick={() => handleLike(item._id)}
                              />
                            ) : (
                              <AiOutlineLike
                                className="text-2xl text-slate-900 ml-4 mt-2"
                                onClick={() => handleLike(item._id)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <CreateBlog
            createBlog={createBlog}
            setCreateBlog={setCreateBlog}
            id={id}
            name={data.name}
            update={update}
            setUpdate={setUpdate}
          />
        </>
      ) : (
        <>
          <Navbar
            name={data.name}
            id={id}
            setId={setId}
            createBlog={createBlog}
            setCreateBlog={setCreateBlog}
            myBlogs={myBlogs}
            setMyBlogs={setMyBlogs}
          />
          <MyBlogs setMyBlog={setMyBlogs} id={id} />
          <CreateBlog
            createBlog={createBlog}
            setCreateBlog={setCreateBlog}
            id={id}
            name={data.name}
            update={update}
            setUpdate={setUpdate}
          />
        </>
      )}
    </>
  );
};

export default Home;

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
    fetch(`http://localhost:5000/like?`, {
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
          <div className="flex justify-center items-center m-32 h-full flex-col">
            <div
              className="rounded-t-lg h-[50vh] w-[80vw] absolute top-16 z-0 mt-10"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')",
                backgroundSize: "cover",
                filter: "brightness(50%)",
              }}
            />
            <div className="rounded-lg h-full w-[80vw] bg-slate-200 shadow-2xl">
              <div className="p-5 m-5 mb-20 relative z-1 flex justify-center items-center flex-col">
                <h1 className="text-3xl font-bold text-white m-5">Blog Title</h1>
                <p className="text-white text-2xl mt-24 mb-24 p-5 rounded-lg">
                "Blogging is not just about publishing, it's about sharing your voice with the world." - Unknown
                </p>
                <div className="grid grid-cols-3 gap-12 px-5 py-10">
                  {blog &&
                    blog.map((item, index) => (
                      <div
                        key={item}
                        className="bg-white rounded-lg p-3 h-[500px] w-3/2 overflow-hidden shadow-xl"
                      >
                        <h1 className="text-2xl font-bold text-slate-900 mb-5  whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.title}
                        </h1>
                        <p className="text-slate-900 text-lg overflow-hidden text-ellipsis h-[360px] mb-5">
                          {item.blog}
                        </p>
                        <div className="flex justify-between">
                          <button
                            className="bg-slate-900 text-white rounded-lg p-2"
                            onClick={() => {
                              Router.push(`/share/${item._id}`);
                            }}
                          >
                            More info
                          </button>
                          <div className="flex">
                            {console.log(like)}
                            {like && like[index] ? (
                              <AiOutlineDislike
                                className="text-2xl text-slate-900 ml-5 mt-2"
                                onClick={() => handleLike(item._id)}
                              />
                            ) : (
                              <AiOutlineLike
                                className="text-2xl text-slate-900 ml-5 mt-2"
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
          <MyBlogs name={data.name} setMyBlog={setMyBlogs} />
        </>
      )}
    </>
  );
};

export default Home;

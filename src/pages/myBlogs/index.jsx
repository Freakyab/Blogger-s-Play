import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
import Navbar from "@/components/navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../../components/Popup";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import categories from "@/components/categories";

const EditorBlock = dynamic(
  () => import("../../components/Editor/EditorToggle"),
  {
    ssr: false,
  }
);

const MyBlogs = () => {
  const { data: session } = useSession();
  const { user } = session || {};
  const { id } = user || {};
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [newData, setNewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [PopupDisplay, setPopupDisplay] = useState(false);
  const [page, setPage] = useState("myBlogs-update");
  const [newIndex, setNewIndex] = useState(-1);
  const [blogId, setBlogId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [categoriesName, setCategoriesName] = useState("");
  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/myBlogs?authorId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setLoading(false);
        setBlogs(data.blogs);
      } else {
        setLoading(true);
      }
    };
    if (isDelete) {
      getBlogs();
      setIsDelete(false);
    } else {
      getBlogs();
    }
  }, [id, isDelete]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
            <Navbar />
          {PopupDisplay ? (
            <Popup
              page={page}
              controls={{
                newData,
                blogId,
                setBlogId,
                blogs,
                setNewData,
                setPopupDisplay,
                newIndex,
                setNewIndex,
                setIsDelete,
                setToggle,
                deleteId,
                setDeleteId,
                categoriesName,
                router : router
              }}
            />
          ) : null}
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <img
                src="/FancyBackground.svg"
                alt="Fancy Background"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-7 flex justify-center items-center flex-col min-h-screen py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-black m-5">My Blogs</h1>
              <button
                onClick={() => router.replace("/Editor")}
                className="flex items-center gap-2 rounded bg-green-500 text-white font-bold py-2 px-4 hover:bg-green-700 mb-4 sm:mb-0">
                <PencilIcon className="h-5 w-5" /> Create
              </button>

              <div className="flex flex-wrap gap-10">
                {Array.isArray(blogs) &&
                  blogs.map((blog, index) => (
                    <div
                      key={blog._id}
                      className="bg-white bg-opacity-75 dark:bg-opacity-90 overflow-hidden shadow-xl sm:rounded-lg w-[100vw] md:w-[90vw] h-full">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex m-auto"
                        onClick={() => {
                          setToggle(!toggle);
                        }}>
                        Edit
                      </button>

                      <EditorBlock
                        key={toggle} // Add key prop to force re-render when toggle changes
                        data={blog}
                        controls={{
                          toggle,
                          index,
                          setNewData,
                          setNewIndex,
                        }}
                        holder={`holder-${blog._id}`}
                      />

                      {!toggle ? (
                        <>
                          <div className="flex justify-between items-center gap-2 p-4">
                          <button
                            className="p-3 rounded-md shadow-md transition-opacity hover:opacity-50"
                            style={{
                              backgroundImage: `url(${
                                categories.filter(
                                  (category) => category.title === blog.category
                                )[0].backgroundImage
                              })`,
                              background:
                                categories.filter(
                                  (category) => category.title === blog.category
                                )[0].background ||
                                categories.filter(
                                  (category) => category.title === blog.category
                                )[0].backgroundImage,
                            }}
                            onClick={() => {
                              setPage("myBlogs-Category");
                              setPopupDisplay(true);
                              setBlogId(blog._id);
                              setCategoriesName(blog.category);
                            }}>
                            {blog.category}
                          </button>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex"
                              onClick={() => {
                                setPopupDisplay(true);
                                setPage("myBlogs-update");
                                setBlogId(blog._id);
                              }}>
                              <PencilIcon className="h-5 w-5" /> Update
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex"
                              onClick={() => {
                                setPage("myBlogs-delete");
                                setPopupDisplay(true);
                                setDeleteId(blog._id);
                              }}>
                              <TrashIcon className="h-5 w-5" /> Delete
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default MyBlogs;

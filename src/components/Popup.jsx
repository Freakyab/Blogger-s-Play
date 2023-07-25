import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import categories from "./categories";

import { useSession } from "next-auth/react";

const createBlog = ({ page, controls }) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (page === "myBlogs-Category") {
      setSelectedCategory(
        categories.filter(
          (category) => category.title === controls.categoriesName
        )[0].id
      );
    }
  }, [status, session]);

  const { user } = session || {};
  const { name, id } = user || {};

  const [selectedCategory, setSelectedCategory] = useState(-1);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    toast.success(`Selected ${category.title} category`);
  };

  const handleSumbit = async () => {
    if (page === "myBlogs-Category") {
      await fetch("http://localhost:5000/editCategory", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: controls.blogId,
          category: categories[selectedCategory].title,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.success) {
            controls.setPopupDisplay(false);
            controls.router.replace("/");
          }
        })
        .catch((err) => console.log(err));
    } else {
      if (selectedCategory === -1) {
        toast.error("Please select a category");
        return;
      }
      await fetch("http://localhost:5000/saveBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: controls.data,
          author: name,
          authorId: id,
          category: categories[selectedCategory].title,
          likes: 0,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            controls.setData(null);
            controls.setDeleteData(true);
            controls.setPopupDisplay(false);
            controls.router.push("/myBlogs");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateSumbit = async () => {
    const { newData, blogId, blogs, setNewData, newIndex, setNewIndex } =
      controls;
    const ObjectData = blogs[newIndex];
    const newObjectData = {
      ...ObjectData,
      data: newData,
    };
    setNewData(newObjectData);
    setNewIndex(-1);
    await fetch("http://localhost:5000/updateBlog", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: newData,
        id: blogId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          controls.setPopupDisplay(false);
          controls.setBlogId(null);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSumbit = async () => {
    const { deleteId, setDeleteId } = controls;
    await fetch("http://localhost:5000/deleteBlog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: deleteId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          controls.setPopupDisplay(false);
          controls.setIsDelete(true);
          setDeleteId(null);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="z-10 fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
        <div className="bg-slate-200 rounded-lg p-6 max-w-md">
          {page == "Editor" || page == "myBlogs-Category" ? (
            <>
              <h2 className="text-2xl font-semibold mb-5 uppercase">
                Select one ,
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-5">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    className={`p-3 rounded-md shadow-md transition-opacity ${
                      selectedCategory === -1 || selectedCategory === index
                        ? "scale-105 "
                        : "opacity-10 hover:opacity-60"
                    }`}
                    style={{
                      backgroundImage: `url(${category.backgroundImage})`,
                      background:
                        category.background || category.backgroundImage,
                    }}
                    onClick={() => handleCategorySelect(category)}>
                    <span className="text-white px-4 py-2 rounded">
                      {category.title}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : null}
          <div className={`text-xl font-semibold mb-5 uppercase text-center`}>
            {page === "myBlogs-update"
              ? "Are you sure you want to update this blog?"
              : page === "myBlogs-delete"
              ? "Are you sure you want to delete this blog?"
              : null}
          </div>
          <div className={`grid grid-cols-2 gap-2 mb-5 text-white text-lg`}>
            <button
              className="bg-gray-700 p-3 rounded-md shadow-md transition-opacity hover:bg-gray-600"
              onClick={
                page === "myBlogs-update"
                  ? handleUpdateSumbit
                  : page === "myBlogs-delete"
                  ? handleDeleteSumbit
                  : handleSumbit
              }>
              {console.log(page)}
              Confirm
            </button>
            <button
              className="bg-gray-700 p-3 rounded-md shadow-md transition-opacity
              hover:bg-gray-600
              "
              onClick={() => {
                controls.setPopupDisplay(false);
              }}>
              Close
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default createBlog;

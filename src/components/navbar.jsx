import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({ id, name, setId, setCreateBlog, CreateBlog, setMyBlogs, myBlogs }) => {
  const [display, setDisplay] = useState(false);

  return (
    <>
      <div className="flex fixed justify-between top-0 items-center bg-slate-900 p-5 w-full z-50">
        <h1 className="text-3xl font-bold text-white">Blog Title</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold mr-5">{name}</h1>
          <button
            className="bg-white text-slate-900 rounded-lg p-2"
            onClick={() => {
              setDisplay(!display);
            }}
          >
            <MdAccountCircle />
          </button>
          {display && (
            <div className="absolute top-16 right-0 bg-white rounded-lg shadow-2xl p-5 font-semibold shadow-black cursor-pointer">
              <h1
                className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                onClick={() => {
                  setCreateBlog(false);
                  setMyBlogs(false);
                  setDisplay(false);
                }}
              >
                Dashboard
              </h1>
              <h1
                className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                onClick={() => {
                  setCreateBlog(!CreateBlog);
                  setDisplay(false);
                }}
              >
                Create Blog
              </h1>
              <h1
                className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                onClick={() => {
                  setMyBlogs(!myBlogs);
                  setDisplay(false);
                }}
              >
                My Blogs
              </h1>
              <h1
                className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                onClick={() => {
                  setId("");
                  setDisplay(false);
                }}
              >
                Logout
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

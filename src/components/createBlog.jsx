import React, { useState } from 'react';

const createBlog = ({ createBlog, setCreateBlog,id,name }) => {
  const [form, setForm] = useState({ title: "", blog: "", imgUrl: "",by : id ,date : "",like : 0,name: name })
  const handleChange = async(e) => {
    e.preventDefault();
    let date = new Date()
    setForm({...form,date : date});
    const res = await fetch('http://localhost:5000/createBlog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    setCreateBlog(!createBlog)
    setForm({ title: "", blog: "", imgUrl: "",by : id ,date : "",like : [],name: name })
  }


  return (
    <div>
      {createBlog && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white flex flex-col rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Blog details</h2>

            <input type="text"
              className='mb-4 border border-gray-300 p-2 rounded'
              placeholder='Title'
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input type="text"
              className='mb-4 border border-gray-300 p-2 rounded'
              placeholder='url'
              onChange={(e) => setForm({ ...form, imgUrl: e.target.value })}
            />
            < textarea
              placeholder='blog'
              className='mb-4 border border-gray-300 p-2 rounded'
              onChange={(e) => setForm({ ...form, blog: e.target.value })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleChange}

            >
              Create Blog
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setCreateBlog(!createBlog)}
            >
              Close Popup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default createBlog;

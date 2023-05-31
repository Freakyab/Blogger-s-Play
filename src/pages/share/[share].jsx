import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Share = () => {
  const router = useRouter();
  const { share } = router.query;
  const [item, setItem] = useState([]);

  useEffect(() => {
    if (share === undefined) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`https://blogger-play.vercel.app/share?id=${share}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setItem(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [share]);

  return (
    <>
      {item && (
        <div className="flex justify-center items-center m-10 h-full flex-col bg-slate-200 shadow-xl rounded-3xl">
          <h1 className="text-3xl font-bold text-black m-5">Blog details</h1>
          <div className="grid grid-cols-1 gap-12 px-5 py-10">
            <div key={item} className="bg-white rounded-lg p-3 w-full">
              <h1 className="text-2xl font-bold text-slate-900 mb-5">
                {item.title}
              </h1>
              <div className="mb-5 bg-black w-full h-1 rounded-2xl"></div>
              <img
                src={item.imgUrl}
                alt="blogImage"
                className="w-full object-cover rounded-lg h-96 mb-5 shadow-xl"
              />
              {item.blog?.split('\n').map((paragraph, i) => (
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Share;

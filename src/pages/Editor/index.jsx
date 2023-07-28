import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/Home.module.css"; // Import CSS module for local styles

// auth and Router
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import Router from "next/router";

// Components
import Popup from "../../components/Popup";

const EditorBlock = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false,
});

const Home = () => {
  // state to hold output data. we'll use this for rendering later
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
  const { name } = user || {};
  const [data, setData] = useState(null);
  const [deleteData, setDeleteData] = useState(false);
  const controls = { deleteData: deleteData, setDeleteData: setDeleteData };
  const [popupDisplay, setPopupDisplay] = useState(false);

  return (
    <>
      {popupDisplay ? (
        <Popup
          page={"Editor"}
          controls={{
            popupDisplay: popupDisplay,
            setPopupDisplay: setPopupDisplay,
            data: data,
            setData: setData,
            setDeleteData: setDeleteData,
            router : router
          }}
        />
      ) : null}
      <div className={styles.fancyBackground}>
        <div className=" bg-white rounded-lg shadow-2xl min-w-[50vw]">
          <div className="bg-gray-700 text-white py-4 px-6 rounded-t-lg flex justify-between">
            <h1 className="text-xl font-semibold">Blogger's Editor</h1>
            <h1 className="text-xl font-semibold cursor-pointer">
              Hello,{" "}
              <span className="text-xl font-semibold cursor-pointer text-blue-400 capitalize">
                {name}
              </span>
            </h1>
          </div>
          <div
            className={`px-10 h-auto ${
              popupDisplay !== true ? null : "hidden"
            }`}>
            <EditorBlock
              data={data}
              onChange={setData}
              holder="editorjs-container"
              controls={controls}
            />
          </div>
          {data ? (
            <>
              <button
                className="bg-gray-700 text-white py-2 px-4 border w-1/2 hover:bg-gray-600"
                onClick={() => setPopupDisplay(true)}>
                Save
              </button>
              <button
                className="bg-gray-700 text-white py-2 px-4  w-1/2 hover:bg-gray-600"
                onClick={() => {
                  setDeleteData(!deleteData);
                  setData(null);
                }}>
                Remove all
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Home;

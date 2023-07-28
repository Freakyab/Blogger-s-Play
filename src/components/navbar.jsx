import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Login from "../components/Login";
import Typewriter from "./typeWriting";

const Navbar = () => {
  const { data: session } = useSession();
  const [display, setDisplay] = useState(false);
  const [loadLogin, setLoadLogin] = useState(false);

  const { user } = session || {};
  const { name } = user || {};
  const router = useRouter();
  const { pathname } = router;

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <div className="flex fixed justify-between top-0 items-center bg-slate-900 p-5 w-full z-50">
        <h1 className="text-3xl font-sans text-white">Blogger's Play</h1>
        <div className="flex justify-between items-center">
          <h1
            className={`text-white text-xl font-bold mr-5 capitalize cursor-pointer${
              !name ? "cursor-pointer" : null
            }`}
            onClick={!name ? () => setLoadLogin(true) : null}>
            {name ? 
            <Typewriter text={name} />: "Login"}
          </h1>
          {name ? (
            <button
              className="bg-white text-slate-900 rounded-lg p-2"
              onClick={() => {
                setDisplay(!display);
              }}>
              <MdAccountCircle
                onClick={() => {
                  setDisplay(!display);
                }}
              />
            </button>
          ) : null}
          {loadLogin && (
            <Login
              onClose={() => {
                setLoadLogin(false);
              }}
            />
          )}

          {display && (
            <div className="absolute top-16 right-0 bg-white rounded-lg shadow-2xl p-5 font-semibold shadow-black cursor-pointer">
              {pathname === "/" && pathname === "/dashboard" && (
                <h1
                  className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                  onClick={() => {
                    setDisplay(false);
                    router.push("/");
                  }}>
                  Dashboard
                </h1>
              )}

              <h1
                className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                onClick={() => {
                  router.push("/Editor");
                  setDisplay(false);
                }}>
                Create Blog
              </h1>

              <h1
                className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                onClick={() => {
                  router.push("/myBlogs");
                  setDisplay(false);
                }}>
                My Blogs
              </h1>
              <h1
                className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                onClick={handleLogout}>
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

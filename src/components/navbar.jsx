import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import CreateBlogPopup from '@/components/createBlogPopup';

const Navbar = () => {
  const { data: session } = useSession();
  const [display, setDisplay] = useState(false);
  const [blogDisplay, setBlogDisplay] = useState(false);

  const { user } = session || {};
  const { name } = user || {};
  const router = useRouter();
  const { pathname } = router;

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      {blogDisplay ? (
        <CreateBlogPopup
        blogDisplay={blogDisplay}
        setBlogDisplay={setBlogDisplay}
        />
      ) : null}
      <div className="flex fixed justify-between top-0 items-center bg-slate-900 p-5 w-full z-50">
        <h1 className="text-3xl font-bold text-white">Blogger's Play</h1>
        <div className="flex justify-between items-center">
          {pathname !== '/share/[share]' || session ? (
            <h1 className="text-white text-xl font-bold mr-5">{name}</h1>
          ) : null}
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
              {pathname === '/share/[share]' && !session ? (
                <h1
                  className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                  onClick={() => {
                    setDisplay(false);
                    router.push('/');
                  }}
                >
                  Login
                </h1>
              ) : (
                <>
                  <h1
                    className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                    onClick={() => {
                      setDisplay(false);
                      router.push('/dashboard');
                    }}
                  >
                    Dashboard
                  </h1>
                  {pathname !== '/dashboard' && (
                    <h1
                      className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                      onClick={() => {
                        setBlogDisplay(true);
                        setDisplay(false);
                      }}
                    >
                      Create Blog
                    </h1>
                  )}
                  <h1
                    className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                    onClick={() => {
                      router.push('/myBlogs');
                      setDisplay(false);
                    }}
                  >
                    My Blogs
                  </h1>
                  <h1
                    className="text-xl pl-5 pr-5 pt-2 pb-2 hover:bg-slate-600 hover:text-white rounded-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </h1>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React from 'react';
import styles from '@/styles/loader.module.css'; // Import the CSS module

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`w-16 h-16 border-4 border-gray-300 rounded-full ${styles['animate-loader']}`}></div>
    </div>
  );
};

export default Loader;

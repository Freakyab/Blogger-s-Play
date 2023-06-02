import React from 'react';
import styles from '@/styles/loader.module.css'; // Import the CSS module

const Loader = () => {
  return (
    <div className='flex flex-col bg-gray-700 w-screen h-screen justify-center items-center'>

      <div class={styles.clock_loader}></div>
      <h1 className='mt-10 text-4xl font-bold text-center text-white'
      >
        Loading...
      </h1>
    </div>
  );
};

export default Loader;

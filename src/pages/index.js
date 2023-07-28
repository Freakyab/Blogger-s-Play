import Head from "next/head";
import Dashboard from "./dashboard";
import Navbar from "@/components/navbar";



export default function Home() {
  return (
    <>
      <Head>
        <title>Blogger's Page</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Dashboard />
      </main>
    </>
  );
}

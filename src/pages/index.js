import Head from "next/head";
import LoginPage from "@/pages/loginPage";
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
        <LoginPage />
      </main>
    </>
  );
}

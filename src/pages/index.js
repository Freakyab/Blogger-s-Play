import Head from "next/head"
import LoginPage from "@/pages/loginPage"

export default function () {
  return (
    <>
      <Head>
        <title>Blogger's Page</title>
      </Head>
      <main>
        <LoginPage />
      </main>
    </>
  )
}

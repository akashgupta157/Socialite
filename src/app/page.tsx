"use client"
import isAuth from "@/isAuth";
const Home = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <p>Dashboard</p>
    </main>
  );
};


export default isAuth(Home);
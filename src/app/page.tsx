"use client"
import Navbar from "@/components/Navbar";
import isAuth from "@/isAuth";
const Home = () => {
  return (
    <main >
      <Navbar />
    </main>
  );
};


export default isAuth(Home);
// Custom Login/SignUp
// Feeds/Posts
// Add posts
// Upload Photos
// Create Groups/Events
// Multi-level commenting
// Like/Share/Follow
// Web Chat
// Mange Profile
// Manage Photos
// Notifications
// Help & Support
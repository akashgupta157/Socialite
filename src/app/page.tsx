"use client"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import isAuth from "@/IsCompAuth";
import Feed from "@/components/Feed";
import { useSelector } from "react-redux";
const Home = () => {
  const selected = useSelector((state: any) => state.selection.selected)
  return (
    <main >
      <Navbar />
      <div className="md:flex">
        <Sidebar />
        {selected === 'Home' && <Feed />}
      </div>
    </main>
  );
};
export default isAuth(Home);
// export default Home;
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
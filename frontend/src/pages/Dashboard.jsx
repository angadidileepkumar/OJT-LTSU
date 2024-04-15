import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashAllBooks from "../components/DashAllBooks";
import AddBook from "../pages/AddBook";
import DashUsers from "../components/DashUsers";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlPharse = new URLSearchParams(location.search);
    const tabFromUrl = urlPharse.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* SideBar  */}
        <DashSideBar />
      </div>

      {/* profile */}
      {tab === "profile" && <DashProfile />}

      {/* posts */}
      {tab === "books" && <DashAllBooks />}
      {/* add books */}
      {tab === "add-book" && <AddBook />}
      {/* users */}
      {tab === "users" && <DashUsers />}
    </div>
  );
}

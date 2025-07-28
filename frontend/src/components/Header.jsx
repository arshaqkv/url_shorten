import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import DarkModeToggler from "./DarkModeToggler";
import { Link2, LogOut, LucideLayers2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../api/axiosInstance";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");
      toast.success(response.data.message);
      localStorage.removeItem("isLoggedIn");
      navigate("/auth");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  return (
    <nav className="flex justify-between items-center px-8 py-6">
      <Link to="/" className="font-extrabold uppercase flex gap-1">
        <LucideLayers2 />
        <span>Trimmr</span>
      </Link>
      <div className="flex gap-2">
        <div>
          {!isLoggedIn ? (
            <Button
              className="cursor-pointer"
              variant={"outline"}
              onClick={() => navigate("/auth")}
            >
              Login
            </Button>
          ) : (
            <DropdownMenu className="cursor-pointer">
              <DropdownMenuTrigger className="bg-gray-200 dark:bg-gray-800 text-gray-950 dark:text-white font-extrabold px-5 py-1.5 rounded-md hover:text-blue-300 dark:hover:text-yellow-600 cursor-pointer">
                {user && user.name.at(0)}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Welcome {user && user.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/link"} className="flex items-center">
                    <Link2 className="mr-2 h-4 w-4 " />
                    <span>Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <div className="text-red-400 flex items-center">
                    <LogOut className="mr-2 h-4 w-4 " />
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <DarkModeToggler />
      </div>
    </nav>
  );
};

export default Header;

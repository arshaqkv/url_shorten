import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import axios from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", formData);
      toast.success(response.data.message);
      localStorage.setItem("isLoggedIn", true);
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you have already one
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type={"email"}
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type={"password"}
            placeholder="Password"
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;

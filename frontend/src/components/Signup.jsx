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

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", formData);
      toast.success(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>if you don't have an account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type={"text"}
            placeholder="Name"
            onChange={handleInputChange}
          />
        </div>
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
        <Button variant={"outline"} onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Signup"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;

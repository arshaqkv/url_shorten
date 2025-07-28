import { BeatLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Copy, Unlink } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayUrl, setDisplayUrl] = useState("");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      return navigate("/auth");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/url/shorten", { originalUrl });
      setDisplayUrl(response.data.shortUrl);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-10 sm:my-16 inline-block text-3xl sm:text-6xl lg:text-7xl text-center font-bold">
        <Unlink />
        From Long URLs to <br />
        <span className="text-pink-900">Smart Links – Instantly</span>
      </h1>
      <form
        className="flex sm:h-14 flex-col sm:flex-row md:w-2/4 gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          className="h-full flex-1 py-4 px-4"
          type={"text"}
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter your looooong URL"
        />
        <Button
          className="h-full cursor-pointer"
          variant={"destructive"}
          type="submit"
        >
          {loading ? <BeatLoader size={10} /> : "Shorten"}
        </Button>
      </form>
      {displayUrl && (
        <div className="flex items-center justify-between w-md mt-3 bg-gray-300 dark:bg-gray-800 rounded-md p-2">
          <a href={displayUrl} target="_blank">
            {displayUrl}
          </a>
          <Button
            className="cursor-pointer"
            variant={"outline"}
            onClick={() => {
              navigator.clipboard.writeText(displayUrl);
              toast.success("Link copied to clipboard");
            }}
          >
            <Copy />
          </Button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

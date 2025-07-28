import { BarLoader } from "react-spinners";
import axios from "../api/axiosInstance";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import LinkCard from "@/components/LinkCard";

const LinkPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/url");
        const urls = response.data.urls;
        setUrls(urls);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="mx-8 pb-5">
      {loading && <BarLoader width={"100%"} color="#36d7b7" />}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Links created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between mt-4">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          Create Link
        </Button>
      </div>
      {urls.map((url) => {
        return <LinkCard key={url._id} url={url} />;
      })}
    </div>
  );
};

export default LinkPage;

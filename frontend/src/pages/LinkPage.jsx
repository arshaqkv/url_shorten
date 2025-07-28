import { BarLoader } from "react-spinners";
import axios from "../api/axiosInstance";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const LinkPage = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalLinks, setTotalLinks] = useState(0);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/url");
        const urls = response.data.urls;
        setUrls(urls);
        setTotalLinks(urls.length);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div>
      {loading && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="m-10">
        <Card>
          <CardHeader>
            <CardTitle>Links created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{totalLinks}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinkPage;

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import axios from "../api/axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { config } from "../config/config";
import { Link2 } from "lucide-react";
import LocationData from "../components/LocationData";

const backend = config.app.BASE_URL;

const AnlyticsPage = () => {
  const { id } = useParams();
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUrlData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/url/analytics/${id}`);
        setUrlData(response.data.shortUrl);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrlData();
  }, []);

  return (
    <>
      {loading && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className="mx-6">
        <Card className="p-4">
          <span className="text-3xl text-blue-400 font-extrabold hover:underline cursor-pointer">{`${backend}/${urlData?.shortCode}`}</span>
          <span className="flex items-center gap-1 hover:underline cursor-pointer">
            <Link2 />
            {urlData?.originalUrl}
          </span>
          <span className="flex items-end font-extralight text-sm flex-1">
            Created: {new Date(urlData?.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-end text-red-700 dark:text-red-300 font-extralight text-sm flex-1">
            Expires at: {new Date(urlData?.expiresAt).toLocaleDateString()}{" "}
          </span>
        </Card>
        <div className="flex gap-2 mt-3">
          <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urlData?.analytics?.clicks}</p>
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Location Data</CardTitle>
          </CardHeader>
          <CardContent>
            <LocationData analytics={urlData}/>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
};

export default AnlyticsPage;

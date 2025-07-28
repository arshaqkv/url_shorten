import { config } from "../config/config";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Link2 } from "lucide-react";
import toast from "react-hot-toast";

const backend = config.app.BASE_URL;
const LinkCard = ({ url }) => {
  return (
    <div className="flex flex-col mt-4 md:flex-row gap-5 border p-4 dark:bg-gray-900 rounded-lg">
      <div className="flex justify-between items-center w-full">
        <Link
          to={`/link/${url._id}/analytics`}
          className="flex gap-1 flex-col flex-1"
        >
          <span className="text-3xl text-blue-400 font-extrabold hover:underline cursor-pointer">{`${backend}/${url.shortCode}`}</span>
          <span className="flex items-center gap-1 hover:underline cursor-pointer"><Link2 />{url.originalUrl}</span>
          <span className="flex items-end font-extralight text-sm flex-1">Created: {new Date(url.createdAt).toLocaleDateString()}</span>
          <span className="flex items-end text-red-300 font-extralight text-sm flex-1">
            Expires at: {new Date(url.expiresAt).toLocaleDateString()}{" "}
          </span>
        </Link>
        <Button
          className="cursor-pointer"
          variant={"outline"}
          onClick={() => {
            navigator.clipboard.writeText(`${backend}/${url.shortCode}`);
            toast.success("Link copied to clipboard");
          }}
        >
          <Copy />
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;

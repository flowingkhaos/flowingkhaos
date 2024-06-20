"use client";
import React from "react";
import { DownloadableContentBucket } from "@/lib/gql/queries/blog/posts";
import { Button } from "../ui/button";

interface DownloadableContentProps {
  downloadableContent: DownloadableContentBucket[];
}

const DOWNLOADABLE_CONTENT_BUCKET: React.FC<DownloadableContentProps> = ({
  downloadableContent,
}) => {
  const handleDownload = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="my-16">
      <h1 className="text-3xl h1 text-center text-content uppercase lg:text-4xl">
        Downloadable Content
      </h1>
      {downloadableContent.map((content) => (
        <div key={content.id} className="mb-4 text-content">
          <h1 className="text-lg text-content">
            Content Title:
            <span className="text-primary hover:text-accent hover:underline font-montserrat">
              {" "}
              {content.name}
            </span>
          </h1>
          <p>
            File Name:{" "}
            <span className="text-primary hover:text-accent hover:underline font-montserrat">
              {content.file.fileName}
            </span>
          </p>
          <p>
            File Size:
            <span className="text-primary hover:text-accent hover:underline font-montserrat">
              {" "}
              {formatFileSize(content.file.size)}
            </span>
          </p>
          <Button
            size="lg"
            className="bg-accent"
            type="button"
            onClick={() =>
              handleDownload(content.file.url, content.file.fileName)
            }
          >
            Download
          </Button>
        </div>
      ))}
    </div>
  );
};

// Helper function to format file size
const formatFileSize = (size: number) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  let fileSize = size;

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }

  return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
};

export default DOWNLOADABLE_CONTENT_BUCKET;

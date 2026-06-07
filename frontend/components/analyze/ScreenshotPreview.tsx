"use client";

import { useEffect, useState } from "react";

type ScreenshotPreviewProps = {
  screenshot: File | null;
};

export function ScreenshotPreview({ screenshot }: ScreenshotPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!screenshot) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(screenshot);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [screenshot]);

  if (!previewUrl) {
    return <span className="file-placeholder">Choose file</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={previewUrl}
      alt="Uploaded screenshot preview"
      className="h-36 w-full object-contain"
    />
  );
}

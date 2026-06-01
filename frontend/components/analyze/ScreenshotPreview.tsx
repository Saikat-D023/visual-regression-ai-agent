"use client";

import { useEffect, useMemo } from "react";

type ScreenshotPreviewProps = {
  screenshot: File | null;
};

export function ScreenshotPreview({ screenshot }: ScreenshotPreviewProps) {
  const previewUrl = useMemo(() => {
    return screenshot ? URL.createObjectURL(screenshot) : "";
  }, [screenshot]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

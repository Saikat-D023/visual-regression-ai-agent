"use client";

import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

const directoryInputProps = {
  directory: "",
  webkitdirectory: "",
} as Record<string, string>;

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  meta?: string;
  folder?: boolean;
  preview?: ReactNode;
  onFilesChange: (files: File[]) => void;
};

export function FileInput({
  accept,
  folder = false,
  label,
  meta,
  onFilesChange,
  preview,
}: FileInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onFilesChange(Array.from(event.target.files ?? []));
  }

  return (
    <label className="file-card">
      <span className="file-label">{label}</span>
      {preview ?? <span className="file-placeholder">Choose {folder ? "folder" : "file"}</span>}
      {meta ? <span className="file-meta">{meta}</span> : null}
      <input
        type="file"
        accept={accept}
        multiple={folder}
        onChange={handleChange}
        className="file-input"
        {...(folder ? directoryInputProps : {})}
      />
    </label>
  );
}

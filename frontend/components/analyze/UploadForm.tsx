"use client";

import { Button } from "@/components/ui/Button";
import { FileInput } from "@/components/ui/FileInput";
import { Panel } from "@/components/ui/Panel";
import { ScreenshotPreview } from "./ScreenshotPreview";

type UploadFormProps = {
  codeFiles: File[];
  error: string;
  isAnalyzing: boolean;
  screenshot: File | null;
  onCodeFilesChange: (files: File[]) => void;
  onScreenshotChange: (file: File | null) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function UploadForm({
  codeFiles,
  error,
  isAnalyzing,
  screenshot,
  onCodeFilesChange,
  onScreenshotChange,
  onSubmit,
}: UploadFormProps) {
  return (
    <Panel title="Input">
      <form className="space-y-5" onSubmit={onSubmit}>
        <FileInput
          folder
          label="Source folder"
          accept=".css,.scss,.html,.js,.jsx,.ts,.tsx,.vue,.svelte"
          meta={codeFiles.length ? `${codeFiles.length} files selected` : ""}
          onFilesChange={onCodeFilesChange}
        />
        <FileInput
          label="Screenshot"
          accept="image/*"
          meta={screenshot?.name}
          preview={<ScreenshotPreview screenshot={screenshot} />}
          onFilesChange={(files) => onScreenshotChange(files[0] ?? null)}
        />
        {error ? <p className="error-box">{error}</p> : null}
        <Button
          type="submit"
          disabled={isAnalyzing || codeFiles.length === 0 || !screenshot}
          className="w-full"
        >
          {isAnalyzing ? "Analyzing..." : "Run analysis"}
        </Button>
      </form>
    </Panel>
  );
}

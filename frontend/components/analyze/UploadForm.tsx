"use client";

import { ChangeEvent } from "react";
import { FolderOpen, Image as ImageIcon, Play, AlertTriangle } from "lucide-react";
import { ScreenshotPreview } from "./ScreenshotPreview";
import { TextVoiceInput } from "./TextVoiceInput";

type UploadFormProps = {
  codeFiles: File[];
  error: string;
  isAnalyzing: boolean;
  screenshot: File | null;
  textPrompt: string;
  onCodeFilesChange: (files: File[]) => void;
  onScreenshotChange: (file: File | null) => void;
  onTextPromptChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onInteraction: () => boolean;
};

const directoryInputProps = {
  directory: "",
  webkitdirectory: "",
} as Record<string, string>;

export function UploadForm({
  codeFiles,
  error,
  isAnalyzing,
  screenshot,
  textPrompt,
  onCodeFilesChange,
  onScreenshotChange,
  onTextPromptChange,
  onSubmit,
  onInteraction,
}: UploadFormProps) {
  function handleFolderChange(event: ChangeEvent<HTMLInputElement>) {
    if (!onInteraction()) {
      event.preventDefault();
      return;
    }
    onCodeFilesChange(Array.from(event.target.files ?? []));
  }
  
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (!onInteraction()) {
      event.preventDefault();
      return;
    }
    const files = Array.from(event.target.files ?? []);
    onScreenshotChange(files[0] ?? null);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!onInteraction()) return;
    onSubmit(event);
  }

  return (
    <div className="flex flex-col border border-[#333] rounded-xl bg-[#0A0C10] shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden h-full">
      <div className="bg-[#18181C] px-4 py-3 flex items-center justify-between border-b border-[#333] select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#E63B2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#F5C211]"></div>
          <div className="w-3 h-3 rounded-full bg-[#4CD964]"></div>
        </div>
        <div className="text-[10px] text-[#888] font-bold uppercase tracking-wider">Input_Parameters.sh</div>
        <div className="w-12"></div>
      </div>
      
      <form className="flex-1 flex flex-col p-6 space-y-8 overflow-y-auto" onSubmit={handleSubmit}>
        <div className="space-y-6 flex-1">
          {/* Source folder input */}
          <div className="space-y-3">
            <label className="text-[11px] text-[#888] uppercase tracking-wider font-bold block">
              <span className="text-brand-accent mr-2">❯</span> Mount Source Code
            </label>
            <label className="flex items-center gap-4 p-4 rounded-lg border border-dashed border-[#444] bg-[#111] hover:bg-[#151515] hover:border-brand-accent/50 cursor-pointer transition-all group">
              <div className="bg-[#222] group-hover:bg-brand-accent/20 p-2.5 rounded-md text-[#888] group-hover:text-brand-accent transition-colors">
                <FolderOpen size={20} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-sm text-[#DDD] font-medium group-hover:text-white transition-colors">Select project folder</div>
                <div className="text-xs text-[#666] truncate mt-1 font-mono">
                  {codeFiles.length ? <span className="text-emerald-500">Loaded {codeFiles.length} files into memory</span> : "Awaiting directory mount..."}
                </div>
              </div>
              <input
                type="file"
                accept=".css,.scss,.html,.js,.jsx,.ts,.tsx,.vue,.svelte"
                multiple
                onChange={handleFolderChange}
                className="hidden"
                {...directoryInputProps}
              />
            </label>
          </div>

          {/* Screenshot input */}
          <div className="space-y-3">
            <label className="text-[11px] text-[#888] uppercase tracking-wider font-bold block">
              <span className="text-brand-accent mr-2">❯</span> Target State (Screenshot)
              <span className="text-[#555] ml-2 normal-case tracking-normal font-normal">(optional)</span>
            </label>
            <label className="flex flex-col gap-4 p-4 rounded-lg border border-dashed border-[#444] bg-[#111] hover:bg-[#151515] hover:border-brand-accent/50 cursor-pointer transition-all group relative overflow-hidden">
              <div className="flex items-center gap-4 z-10 relative">
                <div className="bg-[#222] group-hover:bg-brand-accent/20 p-2.5 rounded-md text-[#888] group-hover:text-brand-accent transition-colors">
                  <ImageIcon size={20} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm text-[#DDD] font-medium group-hover:text-white transition-colors">Upload visual target</div>
                  <div className="text-xs text-[#666] truncate mt-1 font-mono">
                    {screenshot ? <span className="text-emerald-500">{screenshot.name}</span> : "Awaiting image buffer..."}
                  </div>
                </div>
              </div>
              
              {screenshot && (
                <div className="mt-2 rounded-md overflow-hidden border border-[#333] bg-[#000] relative z-10">
                  <ScreenshotPreview screenshot={screenshot} />
                </div>
              )}
              
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Text + Voice Input */}
          <TextVoiceInput value={textPrompt} onChange={onTextPromptChange} />
        </div>

        {/* Error and Submit */}
        <div className="space-y-4 pt-4 border-t border-[#222]">
          {error && (
            <div className="flex items-start gap-3 p-3 rounded-md bg-[#E63B2E]/10 border border-[#E63B2E]/30 text-[#E63B2E] text-xs">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <p className="font-mono leading-relaxed">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isAnalyzing || codeFiles.length === 0 || (!screenshot && !textPrompt.trim())}
            className="w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-[#ff4d3f] disabled:bg-[#333] disabled:text-[#666] disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider text-xs py-4 rounded-lg transition-all"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Executing Analysis Sequence...
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                Initialize Protocol
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

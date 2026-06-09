"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MessageSquareText, Mic, MicOff, AlertCircle } from "lucide-react";

// Web Speech API types (not in all TS DOM libs)
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: { transcript: string; confidence: number };
}
interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionEventCompat extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

type TextVoiceInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TextVoiceInput({ value, onChange }: TextVoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [interimText, setInterimText] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEventCompat) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      if (final) {
        onChange(value + (value ? " " : "") + final.trim());
        setInterimText("");
      } else {
        setInterimText(interim);
      }
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setInterimText("");
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimText("");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the onresult handler's closure up to date with current `value`
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEventCompat) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      if (final) {
        onChange(value + (value ? " " : "") + final.trim());
        setInterimText("");
      } else {
        setInterimText(interim);
      }
    };
  }, [value, onChange]);

  const toggleRecording = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch {
        // Already started
      }
    }
  }, [isRecording]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
  }, [value]);

  return (
    <div className="space-y-3">
      <label className="text-[11px] text-[#888] uppercase tracking-wider font-bold block">
        <span className="text-brand-accent mr-2">❯</span> Describe the Issue
        <span className="text-[#555] ml-2 normal-case tracking-normal font-normal">(optional)</span>
      </label>

      <div className="relative rounded-lg border border-dashed border-[#444] bg-[#111] hover:border-brand-accent/50 transition-all group focus-within:border-brand-accent/70 focus-within:bg-[#0D0D0D]">
        <div className="flex items-start gap-3 p-4">
          <div className="bg-[#222] group-hover:bg-brand-accent/20 group-focus-within:bg-brand-accent/20 p-2.5 rounded-md text-[#888] group-hover:text-brand-accent group-focus-within:text-brand-accent transition-colors mt-0.5 shrink-0">
            <MessageSquareText size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Describe the visual bug, expected behavior, or additional context for the AI..."
              rows={2}
              className="w-full bg-transparent text-sm text-[#DDD] placeholder:text-[#555] outline-none resize-none leading-relaxed font-mono"
            />
            {interimText && (
              <div className="text-xs text-brand-accent/60 font-mono italic mt-1 animate-pulse">
                {interimText}
              </div>
            )}
          </div>

          {/* Mic Button */}
          <div className="shrink-0 mt-0.5">
            {speechSupported ? (
              <button
                type="button"
                onClick={toggleRecording}
                className={`relative p-2.5 rounded-md transition-all ${
                  isRecording
                    ? "bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    : "bg-[#222] text-[#888] hover:bg-brand-accent/20 hover:text-brand-accent border border-transparent"
                }`}
                title={isRecording ? "Stop recording" : "Start voice input"}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                {isRecording && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
            ) : (
              <div
                className="p-2.5 rounded-md bg-[#222] text-[#555] cursor-not-allowed"
                title="Voice input is not supported in this browser. Use Chrome or Edge."
              >
                <AlertCircle size={18} />
              </div>
            )}
          </div>
        </div>

        {/* Recording indicator bar */}
        {isRecording && (
          <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
        )}
      </div>
    </div>
  );
}

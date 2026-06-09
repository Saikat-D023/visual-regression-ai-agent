"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Key,
  Eye,
  EyeOff,
  Sparkles,
  Check,
  Globe,
  ChevronDown,
} from "lucide-react";
import { AIProvider, ApiKeyConfig } from "@/hooks/useApiKey";

type BYOKModalProps = {
  isOpen: boolean;
  initialConfig: ApiKeyConfig;
  onSave: (config: ApiKeyConfig) => void;
  onClose: () => void;
};

type ProviderInfo = {
  id: AIProvider;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  placeholder: string;
  defaultModel: string;
  models: string[];
};

const PROVIDERS: ProviderInfo[] = [
  {
    id: "openai",
    name: "OpenAI",
    icon: "⬡",
    color: "#10A37F",
    bgColor: "rgba(16,163,127,0.12)",
    borderColor: "rgba(16,163,127,0.4)",
    placeholder: "sk-proj-...",
    defaultModel: "gpt-4o",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4.1", "gpt-4.1-mini", "o3", "o4-mini"],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    icon: "◈",
    color: "#D4A574",
    bgColor: "rgba(212,165,116,0.12)",
    borderColor: "rgba(212,165,116,0.4)",
    placeholder: "sk-ant-...",
    defaultModel: "claude-sonnet-4-20250514",
    models: ["claude-sonnet-4-20250514", "claude-opus-4-20250514", "claude-3.5-haiku-20241022"],
  },
  {
    id: "google",
    name: "Google Gemini",
    icon: "◆",
    color: "#4285F4",
    bgColor: "rgba(66,133,244,0.12)",
    borderColor: "rgba(66,133,244,0.4)",
    placeholder: "AIza...",
    defaultModel: "gemini-2.5-pro",
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
  },
  {
    id: "minimax",
    name: "Minimax",
    icon: "▣",
    color: "#FF6B35",
    bgColor: "rgba(255,107,53,0.12)",
    borderColor: "rgba(255,107,53,0.4)",
    placeholder: "eyJ...",
    defaultModel: "MiniMax-M1",
    models: ["MiniMax-M1", "MiniMax-T1"],
  },
  {
    id: "custom",
    name: "Custom / Other",
    icon: "⚙",
    color: "#A78BFA",
    bgColor: "rgba(167,139,250,0.12)",
    borderColor: "rgba(167,139,250,0.4)",
    placeholder: "Your API key...",
    defaultModel: "",
    models: [],
  },
];

export function BYOKModal({
  isOpen,
  initialConfig,
  onSave,
  onClose,
}: BYOKModalProps) {
  const [provider, setProvider] = useState<AIProvider>(
    initialConfig.provider || "openai"
  );
  const [apiKey, setApiKey] = useState(initialConfig.apiKey || "");
  const [modelName, setModelName] = useState(initialConfig.modelName || "");
  const [baseUrl, setBaseUrl] = useState(initialConfig.baseUrl || "");
  const [showKey, setShowKey] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedProvider = PROVIDERS.find((p) => p.id === provider)!;

  // Sync from initialConfig when modal opens
  useEffect(() => {
    if (isOpen) {
      setProvider(initialConfig.provider || "openai");
      setApiKey(initialConfig.apiKey || "");
      setModelName(initialConfig.modelName || "");
      setBaseUrl(initialConfig.baseUrl || "");
      setError("");
      setSaving(false);
      setShowKey(false);
    }
  }, [isOpen, initialConfig]);

  // Close model dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowModelDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleProviderChange(id: AIProvider) {
    setProvider(id);
    const prov = PROVIDERS.find((p) => p.id === id)!;
    setModelName(prov.defaultModel);
    setApiKey("");
    setBaseUrl("");
    setError("");
  }

  function handleSave() {
    if (!apiKey.trim()) {
      setError("API key is required");
      return;
    }
    if (provider === "custom" && !baseUrl.trim()) {
      setError("Base URL is required for custom providers");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      onSave({
        provider,
        apiKey: apiKey.trim(),
        modelName: modelName.trim() || selectedProvider.defaultModel,
        baseUrl: provider === "custom" ? baseUrl.trim() : undefined,
      });
      setSaving(false);
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease-out" }}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden"
        style={{
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
          background: "linear-gradient(145deg, #111318, #0A0C10)",
          border: "1px solid #2A2D35",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.1) inset",
        }}
      >
        {/* Top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${selectedProvider.color}, transparent)`,
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{
                background: selectedProvider.bgColor,
                border: `1px solid ${selectedProvider.borderColor}`,
                color: selectedProvider.color,
              }}
            >
              <Key size={20} />
            </div>
            <div>
              <h2 className="text-white font-bold text-base tracking-tight">
                Configure AI Provider
              </h2>
              <p className="text-[#666] text-[11px] mt-0.5 font-mono">
                BYOK — Bring Your Own Key
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1A1D25] hover:bg-[#25282F] text-[#666] hover:text-white transition-all border border-[#2A2D35]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Provider Selection */}
        <div className="px-6 pb-4">
          <label className="text-[10px] text-[#666] uppercase tracking-widest font-bold block mb-3">
            Select Provider
          </label>
          <div className="grid grid-cols-5 gap-2">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleProviderChange(p.id)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center"
                style={{
                  background:
                    provider === p.id ? p.bgColor : "rgba(255,255,255,0.02)",
                  borderColor:
                    provider === p.id ? p.borderColor : "#2A2D35",
                  color: provider === p.id ? p.color : "#888",
                  boxShadow:
                    provider === p.id
                      ? `0 0 20px ${p.bgColor}`
                      : "none",
                }}
              >
                <span className="text-xl leading-none">{p.icon}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider truncate w-full">
                  {p.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="px-6 pb-4 space-y-4">
          {/* API Key */}
          <div className="space-y-2">
            <label className="text-[10px] text-[#666] uppercase tracking-widest font-bold block">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError("");
                }}
                placeholder={selectedProvider.placeholder}
                className="w-full bg-[#0D0F14] border border-[#2A2D35] rounded-lg px-4 py-3 pr-20 text-sm text-[#DDD] placeholder:text-[#444] font-mono outline-none focus:border-[#444] transition-colors"
                style={{
                  caretColor: selectedProvider.color,
                }}
                autoComplete="off"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 rounded-md text-[#555] hover:text-[#999] hover:bg-[#1A1D25] transition-all"
                >
                  {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Model Name */}
          <div className="space-y-2">
            <label className="text-[10px] text-[#666] uppercase tracking-widest font-bold block">
              Model
              <span className="text-[#444] ml-1 normal-case tracking-normal font-normal">
                (optional)
              </span>
            </label>
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center w-full bg-[#0D0F14] border border-[#2A2D35] rounded-lg px-4 py-3 text-sm font-mono cursor-pointer hover:border-[#444] transition-colors"
                onClick={() =>
                  selectedProvider.models.length > 0 &&
                  setShowModelDropdown(!showModelDropdown)
                }
              >
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder={
                    selectedProvider.defaultModel || "Enter model name..."
                  }
                  className="flex-1 bg-transparent text-[#DDD] placeholder:text-[#444] outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
                {selectedProvider.models.length > 0 && (
                  <ChevronDown
                    size={14}
                    className={`text-[#555] transition-transform ${
                      showModelDropdown ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* Model Dropdown */}
              {showModelDropdown && selectedProvider.models.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 bg-[#111318] border border-[#2A2D35] rounded-lg overflow-hidden z-10 shadow-lg"
                  style={{
                    animation: "fadeIn 0.15s ease-out",
                  }}
                >
                  {selectedProvider.models.map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => {
                        setModelName(model);
                        setShowModelDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-mono text-[#AAA] hover:text-white hover:bg-[#1A1D25] transition-colors flex items-center justify-between"
                    >
                      <span>{model}</span>
                      {modelName === model && (
                        <Check size={12} style={{ color: selectedProvider.color }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Base URL (custom only) */}
          {provider === "custom" && (
            <div className="space-y-2">
              <label className="text-[10px] text-[#666] uppercase tracking-widest font-bold block">
                <Globe size={10} className="inline mr-1" />
                Base URL
              </label>
              <input
                type="url"
                value={baseUrl}
                onChange={(e) => {
                  setBaseUrl(e.target.value);
                  setError("");
                }}
                placeholder="https://api.example.com/v1"
                className="w-full bg-[#0D0F14] border border-[#2A2D35] rounded-lg px-4 py-3 text-sm text-[#DDD] placeholder:text-[#444] font-mono outline-none focus:border-[#444] transition-colors"
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 font-mono">
              <span className="shrink-0">✗</span>
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${selectedProvider.color}, ${selectedProvider.color}CC)`,
              color: "#FFF",
              boxShadow: `0 4px 20px ${selectedProvider.bgColor}`,
            }}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Save & Continue
              </>
            )}
          </button>

          <p className="text-center text-[9px] text-[#444] mt-3 font-mono">
            Your key is stored locally in your browser. Never sent to our servers.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

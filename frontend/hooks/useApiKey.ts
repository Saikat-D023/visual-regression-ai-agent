"use client";

import { useState, useEffect, useCallback } from "react";

export type AIProvider =
  | "openai"
  | "anthropic"
  | "google"
  | "minimax"
  | "custom";

export type ApiKeyConfig = {
  provider: AIProvider;
  apiKey: string;
  modelName: string;
  baseUrl?: string;
};

const STORAGE_KEY = "agentix-api-key-config";

const DEFAULT_CONFIG: ApiKeyConfig = {
  provider: "openai",
  apiKey: "",
  modelName: "",
  baseUrl: "",
};

function loadConfig(): ApiKeyConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function useApiKey() {
  const [config, setConfigState] = useState<ApiKeyConfig>(DEFAULT_CONFIG);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setConfigState(loadConfig());
    setLoaded(true);
  }, []);

  const setConfig = useCallback((next: ApiKeyConfig) => {
    setConfigState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage not available
    }
  }, []);

  const clearConfig = useCallback(() => {
    setConfigState(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // noop
    }
  }, []);

  const hasApiKey = loaded && config.apiKey.trim().length > 0;

  return {
    config,
    setConfig,
    clearConfig,
    hasApiKey,
    loaded,
  };
}

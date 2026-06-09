export type AnalysisResult = {
  explanation: string;
  fixedCode: string;
};

export type AnalyzeOptions = {
  codeFiles: File[];
  screenshot?: File | null;
  textPrompt?: string;
  apiKey?: string;
  provider?: string;
  modelName?: string;
  baseUrl?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function analyzeVisualRegression(
  options: AnalyzeOptions
): Promise<AnalysisResult> {
  const { codeFiles, screenshot, textPrompt, apiKey, provider, modelName, baseUrl } = options;

  const formData = new FormData();

  for (const file of codeFiles) {
    formData.append("codeFiles", file, file.webkitRelativePath || file.name);
  }

  if (screenshot) {
    formData.append("screenshot", screenshot);
  }

  if (textPrompt) {
    formData.append("textPrompt", textPrompt);
  }

  if (apiKey) {
    formData.append("apiKey", apiKey);
  }

  if (provider) {
    formData.append("provider", provider);
  }

  if (modelName) {
    formData.append("modelName", modelName);
  }

  if (baseUrl) {
    formData.append("baseUrl", baseUrl);
  }

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? "Analysis failed.");
  }

  return payload as AnalysisResult;
}

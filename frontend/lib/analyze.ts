export type AnalysisResult = {
  explanation: string;
  fixedCode: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function analyzeVisualRegression(
  codeFiles: File[],
  screenshot: File
) {
  const formData = new FormData();

  for (const file of codeFiles) {
    formData.append("codeFiles", file, file.webkitRelativePath || file.name);
  }

  formData.append("screenshot", screenshot);

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

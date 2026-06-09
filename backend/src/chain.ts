// backend/src/chain.ts
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { z } from "zod";

const outputSchema = z.object({
  explanation: z.string().describe(
    "Root cause analysis of the UI layout bug referencing specific code lines."
  ),
  fixedCode: z.string().describe(
    "The complete corrected source code file with all bugs fixed."
  ),
});

export type AnalysisResult = z.infer<typeof outputSchema>;

export const outputParser = StructuredOutputParser.fromZodSchema(
  outputSchema as any
);

export type ModelOptions = {
  apiKey?: string;
  provider?: string;
  modelName?: string;
  baseUrl?: string;
};

function createModel(options: ModelOptions): BaseChatModel {
  const { provider = "openai", apiKey, modelName, baseUrl } = options;

  // Use user-provided key or fall back to env
  const resolvedKey = apiKey || process.env.OPENAI_API_KEY;

  switch (provider) {
    case "anthropic":
      return new ChatAnthropic({
        model: modelName || "claude-sonnet-4-20250514",
        temperature: 0,
        anthropicApiKey: resolvedKey,
      }) as unknown as BaseChatModel;

    case "google":
      return new ChatGoogleGenerativeAI({
        model: modelName || "gemini-2.5-pro",
        temperature: 0,
        apiKey: resolvedKey,
      }) as unknown as BaseChatModel;

    case "custom":
      return new ChatOpenAI({
        model: modelName || "gpt-4o",
        temperature: 0,
        apiKey: resolvedKey,
        configuration: baseUrl ? { baseURL: baseUrl } : undefined,
      }) as unknown as BaseChatModel;

    case "minimax":
      // Minimax uses OpenAI-compatible API
      return new ChatOpenAI({
        model: modelName || "MiniMax-M1",
        temperature: 0,
        apiKey: resolvedKey,
        configuration: {
          baseURL: "https://api.minimaxi.chat/v1",
        },
      }) as unknown as BaseChatModel;

    case "openai":
    default:
      return new ChatOpenAI({
        model: modelName || "gpt-4o",
        temperature: 0,
        apiKey: resolvedKey,
      }) as unknown as BaseChatModel;
  }
}

export async function runVisualRegressionChain(
  codeString: string,
  fileName: string,
  base64Image: string | undefined,
  mimeType: string | undefined,
  textPrompt?: string,
  modelOptions?: ModelOptions
): Promise<AnalysisResult> {
  const formatInstructions = outputParser.getFormatInstructions();

  const systemMessage = new SystemMessage(
    `You are an expert frontend engineer specializing in diagnosing and fixing UI layout bugs.
Analyze the screenshot carefully against the code and return corrected code.

${formatInstructions}`
  );

  // Build content blocks for the human message
  const contentBlocks: Array<
    | { type: "text"; text: string }
    | { type: "image_url"; image_url: { url: string; detail: string } }
  > = [];

  // Code context
  let textContent = `Source file (${fileName}):\n\`\`\`\n${codeString}\n\`\`\`\nDiagnose and fix the UI bug`;

  // Append user's text prompt if provided
  if (textPrompt) {
    textContent += `\n\nAdditional context from the user:\n${textPrompt}`;
  }

  if (base64Image) {
    textContent += ` shown in the screenshot.`;
  } else {
    textContent += ` described above.`;
  }

  contentBlocks.push({ type: "text", text: textContent });

  // Attach screenshot if present
  if (base64Image && mimeType) {
    contentBlocks.push({
      type: "image_url",
      image_url: {
        url: `data:${mimeType};base64,${base64Image}`,
        detail: "high",
      },
    });
  }

  const humanMessage = new HumanMessage({ content: contentBlocks });

  const model = createModel(modelOptions || {});
  const aiMessage = await model.invoke([systemMessage, humanMessage]);
  return outputParser.parse(aiMessage.content as string) as Promise<AnalysisResult>;
}

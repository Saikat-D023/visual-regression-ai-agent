// backend/src/chain.ts
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
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

export const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runVisualRegressionChain(
  codeString: string,
  fileName: string,
  base64Image: string,
  mimeType: string
): Promise<AnalysisResult> {
  const formatInstructions = outputParser.getFormatInstructions();

  const systemMessage = new SystemMessage(
    `You are an expert frontend engineer specializing in diagnosing and fixing UI layout bugs.
Analyze the screenshot carefully against the code and return corrected code.

${formatInstructions}`
  );

  const humanMessage = new HumanMessage({
    content: [
      {
        type: "text",
        text: `Source file (${fileName}):\n\`\`\`\n${codeString}\n\`\`\`\nDiagnose and fix the UI bug shown in the screenshot.`,
      },
      {
        type: "image_url",
        image_url: {
          url: `data:${mimeType};base64,${base64Image}`,
          detail: "high",
        },
      },
    ],
  });

  const aiMessage = await model.invoke([systemMessage, humanMessage]);
  return outputParser.parse(aiMessage.content as string) as Promise<AnalysisResult>;
}

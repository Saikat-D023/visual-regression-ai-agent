import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { runVisualRegressionChain } from "./chain";

// 1. Express setup 
const app = express();
const PORT = process.env.PORT ?? 5000;
const SUPPORTED_CODE_FILE_PATTERN =
  /\.(css|scss|sass|html|js|jsx|ts|tsx|vue|svelte)$/i;
const IGNORED_PATH_SEGMENTS = new Set([
  ".git",
  ".next",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out",
  ".gitignore"
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 301,
    fileSize: 10 * 1024 * 1024,
  },
  preservePath: true,
});

app.use(cors());
app.use(express.json());

function shouldIncludeCodeFile(fileName: string) {
  const normalizedName = fileName.replace(/\\/g, "/");
  const pathSegments = normalizedName.split("/");

  return (
    SUPPORTED_CODE_FILE_PATTERN.test(normalizedName) &&
    !pathSegments.some((segment) => IGNORED_PATH_SEGMENTS.has(segment))
  );
}

function buildCodeSnapshot(codeFiles: Express.Multer.File[]) {
  return codeFiles
    .filter((file) => shouldIncludeCodeFile(file.originalname))
    .sort((firstFile, secondFile) =>
      firstFile.originalname.localeCompare(secondFile.originalname)
    )
    .map((file) => {
      const code = file.buffer.toString("utf8");
      return `File: ${file.originalname}\n\`\`\`\n${code}\n\`\`\``;
    })
    .join("\n\n");
}

app.post(
  "/api/analyze",
  upload.fields([
    { name: "codeFiles", maxCount: 300 },
    { name: "screenshot", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as
        | Record<string, Express.Multer.File[]>
        | undefined;
      const codeFiles = files?.codeFiles ?? [];
      const screenshot = files?.screenshot?.[0];

      if (codeFiles.length === 0 || !screenshot) {
        return res.status(400).json({
          error: "Both codeFiles and screenshot uploads are required.",
        });
      }

      if (!screenshot.mimetype.startsWith("image/")) {
        return res.status(400).json({
          error: "screenshot must be an image upload.",
        });
      }

      const codeString = buildCodeSnapshot(codeFiles);

      if (!codeString) {
        return res.status(400).json({
          error: "The uploaded folder does not contain supported source files.",
        });
      }

      const base64Image = screenshot.buffer.toString("base64");

      const result = await runVisualRegressionChain(
        codeString,
        "uploaded-folder",
        base64Image,
        screenshot.mimetype
      );

      return res.json(result);
    } catch (error) {
      console.error("Failed to analyze visual regression:", error);
      return res.status(500).json({
        error: "Failed to analyze visual regression.",
      });
    }
  }
);

// 6. Start server 
app.listen(PORT, () => {
  console.log(`✅ Visual Regression Agent running on http://localhost:${PORT}`);
});

import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { runVisualRegressionChain } from "./chain";


// 1. Express setup 
const app = express();
const PORT = process.env.PORT ?? 5000;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 2,
    fileSize: 10 * 1024 * 1024,
  },
});

app.use(cors());
app.use(express.json());

app.post(
  "/api/analyze",
  upload.fields([
    { name: "codeFile", maxCount: 1 },
    { name: "screenshot", maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as
        | Record<string, Express.Multer.File[]>
        | undefined;
      const codeFile = files?.codeFile?.[0];
      const screenshot = files?.screenshot?.[0];

      if (!codeFile || !screenshot) {
        return res.status(400).json({
          error: "Both codeFile and screenshot uploads are required.",
        });
      }

      if (!screenshot.mimetype.startsWith("image/")) {
        return res.status(400).json({
          error: "screenshot must be an image upload.",
        });
      }

      const codeString = codeFile.buffer.toString("utf8");
      const base64Image = screenshot.buffer.toString("base64");

      const result = await runVisualRegressionChain(
        codeString,
        codeFile.originalname,
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

// ── 6. Start server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Visual Regression Agent running on http://localhost:${PORT}`);
});

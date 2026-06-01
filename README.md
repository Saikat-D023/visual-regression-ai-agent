# Visual Regression Patch Agent

Visual Regression Patch Agent is a full-stack tool for diagnosing frontend UI regressions from source code and a screenshot. Upload a project folder plus a screenshot, and the backend uses OpenAI vision through LangChain to return a root-cause explanation and corrected source code.

## Features

- Upload frontend source files and a screenshot from the browser.
- Filters supported code files from uploaded folders while ignoring build and dependency directories.
- Sends source context and the screenshot to a GPT-4o vision model.
- Returns a structured response with:
  - `explanation`: root-cause analysis of the visual issue.
  - `fixedCode`: complete corrected source code.
- Next.js frontend with an analysis workbench.
- Express backend with a multipart upload API.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript, Multer
- AI: LangChain, OpenAI GPT-4o

## Project Structure

```text
.
+-- backend/
|   +-- src/
|   |   +-- chain.ts      # LangChain/OpenAI visual analysis chain
|   |   +-- server.ts     # Express API and upload handling
|   +-- .env.example
|   +-- package.json
+-- frontend/
    +-- app/              # Next.js app routes
    +-- components/       # UI and analysis components
    +-- hooks/            # Analysis state hook
    +-- lib/              # API client
    +-- package.json
```

## Prerequisites

- Node.js 20 or newer
- npm
- OpenAI API key

## Setup

Install dependencies for each app:

```bash
cd backend
npm install

cd ../frontend
npm install
```

Create the backend environment file:

```bash
cd ../backend
cp .env.example .env
```

Then set your OpenAI API key in `backend/.env`:

```env
PORT=5000
OPENAI_API_KEY=sk-your-openai-api-key-here
```

Optional frontend environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

If `NEXT_PUBLIC_API_URL` is not set, the frontend defaults to `http://localhost:5000`.

## Development

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the frontend at:

```text
http://localhost:3000
```

The backend runs at:

```text
http://localhost:5000
```

## Usage

1. Open the app in your browser.
2. Select a source folder containing frontend files.
3. Upload a screenshot showing the visual regression.
4. Submit the form.
5. Review the generated explanation and corrected code.

Supported uploaded source file extensions:

```text
.css, .scss, .sass, .html, .js, .jsx, .ts, .tsx, .vue, .svelte
```

Ignored uploaded path segments:

```text
.git, .next, build, coverage, dist, node_modules, out
```

## API

### `POST /api/analyze`

Accepts multipart form data:

- `codeFiles`: one or more uploaded source files
- `screenshot`: one image file

Successful response:

```json
{
  "explanation": "Root cause analysis...",
  "fixedCode": "Complete corrected source code..."
}
```

Common validation errors:

- Missing source files or screenshot
- Screenshot is not an image
- Uploaded folder does not contain supported source files

## Scripts

Backend:

```bash
npm run dev      # Start Express with ts-node-dev
npm run build    # Compile TypeScript to dist/
npm run start    # Run compiled server
```

Frontend:

```bash
npm run dev      # Start Next.js development server
npm run build    # Build production frontend
npm run start    # Start production frontend
npm run lint     # Run ESLint
```

## Production Notes

- Build and run the backend from `backend/dist`.
- Build and run the frontend with Next.js production scripts.
- Set `OPENAI_API_KEY` on the backend host.
- Set `NEXT_PUBLIC_API_URL` on the frontend host if the backend is not available at `http://localhost:5000`.
- Configure CORS in `backend/src/server.ts` before exposing the API publicly.

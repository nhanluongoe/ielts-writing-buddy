# IELTS Writing Buddy

IELTS Writing Buddy is an AI-powered writing practice app for IELTS Writing Task 1 and Task 2. It can generate sample answers, review your own writing, estimate performance, and suggest clearer, more IELTS-style improvements.

The app is built with Next.js and uses Google Gemini through the official `@google/genai` SDK.

## Demo

[https://ielts-writing-assistant.vercel.app/](https://ielts-writing-assistant.vercel.app/)

## Screenshots

<img width="1418" height="962" alt="image" src="https://github.com/user-attachments/assets/343bf6df-3a18-4bdc-b2a6-01b926145b20" />

<img width="1343" height="948" alt="image" src="https://github.com/user-attachments/assets/9b9316aa-1447-4ca1-b69e-10a8979041dd" />


## Features

- Generate IELTS-style sample answers for Task 1 and Task 2.
- Improve existing answers with targeted feedback and suggestions.
- Estimate the band score for submitted writing.
- Support Task 1 image prompts for charts, maps, processes, and diagrams.
- Stream AI responses so feedback appears as it is generated.
- Let users provide their own Gemini API key from the UI when no server key is configured.
- Choose where a browser-saved API key is stored:
  - Session storage: cleared when the tab is closed.
  - Local storage: kept on the device until the user clears it.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Google Gemini API via `@google/genai`
- React Markdown with GitHub-flavored Markdown support

## Getting Started

### Requirements

- Node.js 20 or newer
- npm
- A Google Gemini API key

The current `@google/genai` package requires Node.js 20+.

### Installation

```bash
npm install
```

### Configure Gemini

For local development, create `.env.local`:

```bash
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Key Behavior

The app checks API keys in this order:

1. `GEMINI_API_KEY` from `.env.local` or your deployment environment.
2. A user-provided API key saved from the app UI.

If no key is configured, the Write and Improve pages show a warning banner with an `Add API key` button. Users can save a key for the current tab only or remember it on the device.

The server environment key always takes priority over a browser-saved key.

## Scripts

```bash
npm run dev
```

Start the local development server.

```bash
npm run build
```

Create a production build.

```bash
npm run start
```

Start the production server after building.

```bash
npm run lint
```

Run Next.js linting.

```bash
npm run check-types
```

Run TypeScript type checking.

## Project Structure

```text
src/app
  App routes, pages, layouts, and API handlers

src/components
  Shared UI and page components

src/components/ui/svg
  Custom SVG illustrations and visual assets

src/libs
  Gemini API client and browser API-key helpers

src/styles
  Global Tailwind styles
```

## License

MIT

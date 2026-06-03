# IELTS Writing Buddy

IELTS Writing Buddy is an AI-powered practice app for IELTS Writing Task 1 and Task 2. It helps learners draft sample responses, improve their own essays, estimate band performance, and turn feedback into clearer, more natural IELTS-style writing.

The app is built with Next.js, React, TypeScript, and Tailwind CSS. It supports multiple AI providers, including Google Gemini and ChatGPT via the OpenAI API, so users can choose the model that best fits their writing practice.

## Demo

[https://ielts-writing-assistant.vercel.app/](https://ielts-writing-assistant.vercel.app/)

## Screenshots

<img width="1418" height="962" alt="image" src="https://github.com/user-attachments/assets/343bf6df-3a18-4bdc-b2a6-01b926145b20" />

<img width="1343" height="948" alt="image" src="https://github.com/user-attachments/assets/9b9316aa-1447-4ca1-b69e-10a8979041dd" />

## Features

- Generate IELTS-style sample answers for Writing Task 1 and Task 2.
- Improve existing answers with targeted feedback, corrections, and rewrite suggestions.
- Estimate the band score for submitted writing.
- Support Task 1 image prompts for charts, maps, processes, and diagrams.
- Stream AI responses so feedback appears while it is being generated.
- Switch between supported AI providers from the app settings.
- Use Gemini models with a Gemini API key.
- Use ChatGPT models with an OpenAI API key.
- Choose where a browser-saved API key is stored:
  - Session storage: cleared when the tab is closed.
  - Local storage: kept on the device until the user clears it.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Google Gemini API via `@google/genai`
- ChatGPT via the OpenAI API and `openai` SDK
- React Markdown with GitHub-flavored Markdown support

## Getting Started

### Requirements

- Node.js 20 or newer
- npm
- A Gemini API key or an OpenAI API key

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then use the AI provider settings to choose Gemini or ChatGPT, select a model, and add the matching API key.

## AI Providers

IELTS Writing Buddy currently supports:

- Gemini: powered by Google Gemini models through the official `@google/genai` SDK.
- ChatGPT: powered by OpenAI models through the official `openai` SDK.

Each provider has its own model list and API key. Gemini is selected by default, but users can switch providers from the settings menu at any time.

## API Key Behavior

The app checks the selected provider and model from browser storage. If no API key is saved for the selected provider, the Write and Improve pages show a warning banner with an `Add API key` button.

API keys are stored only in the user's browser. Users can save a key for the current tab only or remember it on the device:

- This tab only: stored in session storage and cleared when the tab is closed.
- Remember on this device: stored in local storage until the user clears it.

Requests are sent directly from the browser to the selected AI provider. A Gemini key is used only for Gemini requests, and an OpenAI key is used only for ChatGPT requests.

## License

MIT

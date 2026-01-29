# Meeting Notes to Action Tracker

A React app that uses Google Gemini to extract action items from meeting notes and display them in an interactive table.

## Setup

```bash
npm install
```

Create a `.env` file:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Run

```bash
npm run dev
```

## Features

- Paste meeting notes and get structured action items via Gemini API
- Action items table with task, owner, and due date
- Mark tasks as done (checkbox + strikethrough)
- Export all tasks as a markdown file

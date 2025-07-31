# 🎬 YouTube Transcript Viewer

A full-stack web app that fetches and displays clean transcripts from any YouTube video using **LangChain**, built with:

- 🦜 LangChain (for YouTube transcript extraction)
- ⚛️ React + Vite + Tailwind CSS (frontend)
- 🖥️ Node.js + Express (backend)

## 🌟 Features

- Paste any YouTube URL and get the full transcript instantly
- Embedded video player with responsive layout
- Clean UI with scrollable transcript section
- Proxy API setup to separate frontend and backend cleanly

## 🚀 Live Demo

👉 [Demo Link](https://your-deployment-url.com)

## 🖥️ Screenshots

| Input YouTube URL | Embedded Video + Transcript |
|-------------------|-----------------------------|
| ![input](assets/input.png) | ![output](assets/output.png) |

## 🧠 How It Works

1. The user pastes a YouTube URL into the input box.
2. The frontend sends a request to the backend:  
   `/api/transcript?url=VIDEO_URL`
3. The backend uses `YoutubeLoader` from `@langchain/community` to fetch transcript data.
4. The transcript and metadata (title, author) are returned to the frontend.
5. The frontend displays the video + transcript in a smooth, scrollable UI.

## 🛠️ Tech Stack

| Layer     | Tech                            |
|-----------|----------------------------------|
| Frontend  | React, Tailwind CSS, Vite        |
| Backend   | Node.js, Express                 |
| AI Utils  | LangChain + YoutubeLoader        |

# Multilingual AI Voice Language Learning Partner

A web application for practicing languages through voice conversations with an AI tutor or assistant.

## Features

- **Learning Mode**: Practice grammar, vocabulary, and pronunciation with AI corrections.
- **Assistant Mode**: Natural conversation in chosen language.
- **Voice Input/Output**: Uses browser Web Speech API for speech recognition and synthesis.
- **Supported Languages**: Arabic, English, German, Italian, Spanish (Assistant Mode); Custom for Learning Mode.
- **Responsive Design**: Works on mobile and desktop.

## Tech Stack

- **Frontend**: React 18 + Vite, TypeScript
- **Backend**: Node.js + Express.js
- **AI**: Hugging Face Inference API (Mistral 7B, LLaMA 2)
- **Database**: MongoDB Atlas + Mongoose
- **Authentication**: JWT + bcryptjs (optional)
- **Utilities**: uuid, date-fns, react-hot-toast, string-similarity

## Setup

### Prerequisites

- Node.js
- MongoDB Atlas account
- Hugging Face account with API key

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables in `backend/.env`:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   HUGGINGFACE_API_KEY=your_hugging_face_api_key
   ```

4. Start the backend:

   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

6. Open http://localhost:5173 in your browser.

## Usage

1. Select mode: Learning or Assistant.
2. Choose language.
3. Start speaking! Use the voice button for input, responses are spoken aloud.

## Deployment

- **Frontend**: Deploy to Vercel .
- **Backend**: Deploy to Render .

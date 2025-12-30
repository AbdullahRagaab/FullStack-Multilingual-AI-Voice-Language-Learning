# 🗣️ Multilingual AI Voice Language Learning Partner

<div align="center">

![Language Learning](https://img.shields.io/badge/AI-Language%20Learning-blue?style=for-the-badge&logo=openai)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) 
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/) 
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/) 
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-green.svg)](https://www.mongodb.com/) 
[![Vite](https://img.shields.io/badge/Vite-5+-pink.svg)](https://vitejs.dev/) 
[![ESLint](https://img.shields.io/badge/ESLint-8+-yellow.svg)](https://eslint.org/) 
[![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-2+-orange.svg)](https://react-hot-toast.com/) 
[![Lucide React](https://img.shields.io/badge/Lucide_React-0.264+-purple.svg)](https://lucide.dev/) 
[![Express.js](https://img.shields.io/badge/Express-4+-black.svg)](https://expressjs.com/) 
[![Stream Chat](https://img.shields.io/badge/Stream_Chat-6+-cyan.svg)](https://getstream.io/chat/) 
[![JWT](https://img.shields.io/badge/JWT-8+-orange.svg)](https://jwt.io/) 
[![CORS](https://img.shields.io/badge/CORS-2+-blue.svg)](https://www.npmjs.com/package/cors) 
[![cookie-parser](https://img.shields.io/badge/cookie_parser-1+-lightgreen.svg)](https://www.npmjs.com/package/cookie-parser) 
[![dotenv](https://img.shields.io/badge/dotenv-16+-green.svg)](https://www.npmjs.com/package/dotenv)

**An intelligent voice-powered web application for immersive language learning through real-time AI conversations**

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Deployment](#-deployment) • [Contributing](#-contributing)

---

</div>

## 📖 Overview

The **AI Voice Language Learning Partner** is a cutting-edge web application that revolutionizes language learning by enabling natural, voice-based conversations with an AI tutor. Whether you're looking to practice grammar, improve pronunciation, or simply engage in casual conversation, this platform adapts to your learning needs.

### ✨ Key Highlights

- 🎤 **Voice-First Interface**: Natural speech recognition and text-to-speech synthesis
- 🤖 **Intelligent AI Tutor**: Powered by state-of-the-art language models (Mistral 7B, LLaMA 2)
- 🌍 **Multilingual Support**: Practice in Arabic, English, German, Italian, or Spanish
- 📱 **Fully Responsive**: Seamless experience across desktop and mobile devices
- 🎯 **Dual Learning Modes**: Choose between structured tutoring or conversational practice

---

## 🚀 Features

### 🎓 Learning Mode
Receive personalized grammar corrections, vocabulary suggestions, and pronunciation feedback from your AI tutor.

**Capabilities:**
- ✅ Real-time grammar and vocabulary error detection
- ✅ One mistake at a time correction approach for better retention
- ✅ Pronunciation tips and phonetic guidance
- ✅ Encouraging feedback and follow-up questions
- ✅ Progress tracking through conversation history

### 💬 Assistant Mode
Engage in natural, flowing conversations without interruption or corrections—perfect for building fluency and confidence.

**Capabilities:**
- ✅ Natural dialogue in your chosen language
- ✅ Context-aware responses
- ✅ Engaging follow-up questions
- ✅ Cultural and conversational nuances
- ✅ Ideal for intermediate to advanced learners

### 🎙️ Voice Technology
- **Speech Recognition**: Browser-native Web Speech API for accurate voice-to-text conversion
- **Text-to-Speech**: Natural-sounding voice synthesis for AI responses
- **Mobile Optimized**: Touch-friendly interface with large voice activation buttons

### 🌐 Supported Languages
| Language | Learning Mode | Assistant Mode |
|----------|--------------|----------------|
| 🇸🇦 Arabic | ✅ | ✅ |
| 🇬🇧 English | ✅ | ✅ |
| 🇩🇪 German | ✅ | ✅ |
| 🇮🇹 Italian | ✅ | ✅ |
| 🇪🇸 Spanish | ✅ | ✅ |
| 🌍 Custom | ✅ | ➖ |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

- **React 18** with modern hooks and functional components
- **TypeScript** for type-safe development
- **Vite** for blazing-fast development and builds
- **React Hot Toast** for elegant notifications
- **Web Speech API** for voice input/output

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

- **Node.js** with Express.js for robust API endpoints
- **MongoDB Atlas** with Mongoose for data persistence
- **JWT Authentication** for secure user sessions
- **bcryptjs** for password hashing
- **Hugging Face Inference API** for AI-powered responses

### AI & NLP
![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=flat&logo=huggingface&logoColor=black)

- **Mistral 7B Instruct**: Advanced instruction-following language model
- **LLaMA 2 Chat**: Conversational AI for natural dialogue
- **String Similarity**: Levenshtein distance for pronunciation scoring
- **Prompt Engineering**: Optimized prompts for learning and conversation modes

### Utilities
- **uuid**: Unique identifier generation
- **date-fns**: Date manipulation and formatting
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Hugging Face** account with API key - [Sign up](https://huggingface.co/join)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ai-language-learning.git
cd ai-language-learning
```

### Step 2: Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/language_assistant?retryWrites=true&w=majority

# JWT Security
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters

# Hugging Face AI
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### 🔑 Getting Your API Keys

**MongoDB Atlas:**
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free cluster (M0 tier)
3. Go to **Database Access** → Create a database user
4. Go to **Network Access** → Add IP Address → Allow access from anywhere (0.0.0.0/0)
5. Click **Connect** → **Drivers** → Copy your connection string
6. Replace `<password>` with your database user password

**Hugging Face:**
1. Visit [Hugging Face](https://huggingface.co/join)
2. Sign up for a free account
3. Go to [Settings → Access Tokens](https://huggingface.co/settings/tokens)
4. Click **New token** → Name: `language-assistant` → Type: **Read**
5. Copy the generated token (starts with `hf_`)

**JWT Secret:**
Generate a secure random string (32+ characters):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Start the Application

#### Start Backend Server (Terminal 1)
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

#### Start Frontend Development Server (Terminal 2)
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🎮 Usage

### Getting Started

1. **Select Your Mode**
   - **Learning Mode**: For grammar corrections and structured practice
   - **Assistant Mode**: For natural conversation and fluency building

2. **Choose Your Language**
   - Select from Arabic, English, German, Italian, or Spanish
   - In Learning Mode, you can specify any target language

3. **Start Speaking**
   - Click the 🎤 microphone button to start voice input
   - Speak clearly into your device's microphone
   - The AI will process your speech and respond with voice output

4. **Review Feedback** (Learning Mode)
   - See corrections highlighted in the chat
   - Read explanations for grammar mistakes
   - Practice pronunciation tips provided

### Tips for Best Experience

- 🎧 **Use headphones** to prevent audio feedback
- 🔇 **Quiet environment** for better speech recognition
- 🗣️ **Speak naturally** at a moderate pace
- 📱 **Allow microphone access** when prompted by your browser
- 🌐 **Chrome/Edge recommended** for best Web Speech API support

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and sign in
3. Click **New Project** → Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
6. Click **Deploy**

### Backend Deployment (Render)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

1. Push your code to GitHub
2. Visit [Render](https://render.com) and sign in
3. Click **New +** → **Web Service**
4. Connect your repository
5. Configure:
   - **Name**: `language-assistant-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables from your `.env` file
7. Click **Create Web Service**

### Alternative Deployment Options

- **Frontend**: Netlify, GitHub Pages, Cloudflare Pages
- **Backend**: Railway, Heroku, DigitalOcean App Platform, AWS Elastic Beanstalk

---

## 📁 Project Structure

```
ai-language-learning/
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Chat.tsx
│   │   │   ├── LanguageSelector.tsx
│   │   │   └── ModeSelector.tsx
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Entry point
│   │   └── App.css         # Styles
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── models/         # Mongoose schemas
│   │   │   ├── User.js
│   │   │   └── Conversation.js
│   │   ├── routes/         # API routes
│   │   │   ├── auth.js
│   │   │   └── conversation.js
│   │   └── server.js       # Express server
│   ├── package.json
│   └── .env                # Environment variables
│
└── README.md               # This file
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** by opening an issue
- 💡 **Suggest features** or improvements
- 📖 **Improve documentation**
- 🔧 **Submit pull requests** with bug fixes or new features

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style Guidelines

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hugging Face** for providing free-tier AI inference API
- **MongoDB Atlas** for cloud database hosting
- **Web Speech API** community for documentation and examples
- **React** and **Vite** teams for excellent developer tools

---

## 📞 Support & Contact

- 📧 **Email**: support@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/ai-language-learning/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-language-learning/discussions)

---

<div align="center">

**Made with ❤️ by [Your Name]**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/ai-language-learning/issues) • [Request Feature](https://github.com/yourusername/ai-language-learning/issues)

</div>

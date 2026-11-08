import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { ASSISTANT_SYSTEM_INSTRUCTION, getApprovedAssistantResponse } from './src/services/assistantKnowledge.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini client server-side
const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenAI | null = null;
if (apiKey) {
  try {
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// AI Assistant endpoint
app.post('/api/assistant/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message string is required' });
    }

    const trimmedMessage = message.trim();

    // Check deterministic approved response for core questions first
    const ruleMatch = getApprovedAssistantResponse(trimmedMessage);

    // If Gemini API is available, we can enhance natural conversation while grounding in strict instructions
    if (genAI && apiKey) {
      try {
        // Construct conversation history for Gemini
        const formattedContents = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.sender === 'user') {
              formattedContents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'assistant') {
              formattedContents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }
        formattedContents.push({ role: 'user', parts: [{ text: trimmedMessage }] });

        const response = await genAI.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction: ASSISTANT_SYSTEM_INSTRUCTION,
          },
        });

        const generatedText = response.text?.trim();
        if (generatedText) {
          return res.json({
            text: generatedText,
            quickAction: ruleMatch.quickAction,
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API call returned error, falling back to approved knowledge responder:', geminiError);
      }
    }

    // Default fallback to approved deterministic knowledge base
    return res.json(ruleMatch);
  } catch (err) {
    console.error('Error in /api/assistant/chat:', err);
    return res.json({
      text: "I don’t have verified information about that in this demonstration. Please contact Pahari Brew directly for accurate details."
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pahari Brew server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

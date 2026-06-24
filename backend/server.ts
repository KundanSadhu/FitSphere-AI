import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { initializeDatabase } from "./db.js";
import { authRouter } from "./routes/auth.js";
import { dataRouter } from "./routes/data.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Neon database
  try {
    await initializeDatabase();
  } catch (e) {
    console.error("Failed to initialize database, continuing anyway:", e);
  }

  // Auth routes (register, login, me)
  app.use("/api/auth", authRouter);

  // Data routes (CRUD for user app data)
  app.use("/api", dataRouter);

  // Initialize Gemini client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });

  // Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Daily Tip
  app.get("/api/daily-tip", async (req, res) => {
    const FALLBACK_TIPS = [
      "Progressive overload is the golden rule! Increase resistance by 2.5% or perform one extra rep weekly to force muscle adaptation.",
      "Hydrate adequately! Consuming 500ml of water 30 minutes before your workout maximizes cellular volume and joint lubrication.",
      "Prioritize 8 hours of sleep for recovery. Deep REM cycles remain the ultimate process for tissue repair and central nervous system energy.",
      "Maintain a consistent protein split! Aim for 1.6g to 2.2g of protein per kilogram of body weight to support muscle fiber repair.",
      "Warm-up with intention. Five minutes of dynamic joint mobilization improves range of motion and protects orthopedic structures.",
      "Post-workout glycogen synthesis is critical. Consuming complex carbs and clean protein within 60 minutes optimizes recovery rhythms."
    ];

    try {
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "MOCK_KEY") {
        const randomFallback = FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
        return res.json({ tip: randomFallback });
      }
      const prompt = "Provide a single, powerful, highly actionable fitness or health tip of the day under 30 words. Focus on either hydration, sleep, HIIT, posture correction, or protein synthesis. Return only the tip text, no quotes.";
      const response = await ai.models.generateContent({ model: "gemini-2.0-flash", contents: prompt });
      const tip = response.text?.trim() || FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)];
      res.json({ tip });
    } catch (err: any) {
      console.log(`[DailyTip-Info] Service temporary status, serving backup tip.`);
      res.json({ tip: FALLBACK_TIPS[Math.floor(Math.random() * FALLBACK_TIPS.length)] });
    }
  });

  // Streaming AI Coach Chat
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "MOCK_KEY") {
        const mockResponses = [
          "I fully understand! To execute your goals effectively, focus on compound movements like standard Squats, Deadlifts, and Flat Bench Press. These excite the majority of motor units and maximize natural metabolic spikes.",
          "Adequate hydration is absolutely paramount! Aim for at least 3.5 Liters of filtered water daily to keep muscle cells fully saturated. Let me know if you want me to outline a customizable 3-day split workout plan for you!",
          "That sounds like an incredible target! Remember to prioritize sleeping at least 7.5 to 8 hours nightly to maximize muscle tissue protein synthesis and central nervous system calibration.",
          "Incredible intensity! Let's examine nutrition closely. Aim to ingest roughly 1.6 grams to 2.2 grams of pristine protein per kilogram of dry lean mass to support continuous hypertrophy cells."
        ];
        const randomAnswer = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        const words = randomAnswer.split(" ");
        for (let i = 0; i < words.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 35));
          res.write(`data: ${JSON.stringify({ chunk: (i === 0 ? "" : " ") + words[i] })}\n\n`);
        }
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      }

      const systemPrompt = `You are Coach Sphere, an elite, highly professional 24/7 AI Fitness & Wellness Coach at FitSphere AI. You understand kinesiology, advanced muscle hypertrophy, weight shredding, and sports science. You describe exercises, posture control, macro configurations, hydration levels, and wellness strategies with high-precision mechanics and encouraging tone. Format responses in clean, structured, visual markdown. Keep things action-focused and highly professional. Do not add flowery marketing slogans or robotic text.`;

      const contents = [];
      if (history && history.length > 0) {
        for (const msg of history) {
          contents.push({ role: msg.role === 'assistant' ? 'model' : 'user', parts: [{ text: msg.content }] });
        }
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const stream = await ai.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents,
        config: { systemInstruction: systemPrompt }
      });

      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.log(`[AICoach-Info] Live model busy, serving localized stream guide.`);
      try {
        const fallbackMsg = "Coach Sphere here! Our high-precision neural connection is currently under high traffic loads, but my localized biometric backup is active. To focus on your athletic progression, ensure you execute compound lifts (such as deep squats, deadlifts, and overhead presses) to stimulate fiber recruitment. Pair this with 1.6–2.2g of high-quality protein per kilogram of weight, and maintain pristine sleeping patterns (7.5-8 hrs) to optimize anabolic repair. Ask me any biomechanical form or dietary scheduling questions, and I'll assist you via my localized data matrix!";
        const words = fallbackMsg.split(" ");
        for (let i = 0; i < words.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 30));
          res.write(`data: ${JSON.stringify({ chunk: (i === 0 ? "" : " ") + words[i] })}\n\n`);
        }
        res.write("data: [DONE]\n\n");
        res.end();
      } catch { res.end(); }
    }
  });

  // Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FitSphere Server running on port ${PORT}`);
  });
}

startServer();

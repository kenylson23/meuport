import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateQuizQuestions, QuizGenerationOptions } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Generate AI quiz questions
  app.post('/api/quiz/generate', async (req, res) => {
    try {
      const { count = 5, difficulty = 'misto', topics = [], language = 'português' }: QuizGenerationOptions = req.body;
      
      // Validate input
      if (count < 1 || count > 10) {
        return res.status(400).json({ error: 'Count must be between 1 and 10' });
      }
      
      const validDifficulties = ['fácil', 'médio', 'difícil', 'misto'];
      if (!validDifficulties.includes(difficulty)) {
        return res.status(400).json({ error: 'Invalid difficulty level' });
      }
      
      if (!Array.isArray(topics)) {
        return res.status(400).json({ error: 'Topics must be an array' });
      }
      
      const questions = await generateQuizQuestions({
        count: Math.min(Math.max(1, count), 10), // Clamp between 1-10
        difficulty,
        topics: topics.slice(0, 10), // Limit topics
        language
      });
      
      res.json({ questions });
    } catch (error) {
      console.error('Quiz generation error:', error);
      res.status(500).json({ 
        error: 'Falha ao gerar perguntas do quiz. Tente novamente.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

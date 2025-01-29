import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { db } from "@db";
import { exercises, userProgress, feedback } from "@db/schema";
import { eq, and } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Get all exercises
  app.get("/api/exercises", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }
    const allExercises = await db.query.exercises.findMany({
      orderBy: exercises.order,
    });
    res.json(allExercises);
  });

  // Get single exercise
  app.get("/api/exercises/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }
    const exerciseId = parseInt(req.params.id);
    const [exercise] = await db
      .select()
      .from(exercises)
      .where(eq(exercises.id, exerciseId))
      .limit(1);

    if (!exercise) {
      return res.status(404).send("Exercise not found");
    }

    res.json(exercise);
  });

  // Get user progress
  app.get("/api/progress", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }
    const progress = await db.query.userProgress.findMany({
      where: eq(userProgress.userId, req.user.id),
      with: {
        feedback: true
      }
    });
    res.json(progress);
  });

  // Get progress for specific exercise
  app.get("/api/progress/:exerciseId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }
    const exerciseId = parseInt(req.params.exerciseId);
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, req.user.id),
          eq(userProgress.exerciseId, exerciseId)
        )
      );

    res.json(progress || null);
  });

  // Update exercise progress
  app.post("/api/progress/:exerciseId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    const exerciseId = parseInt(req.params.exerciseId);
    const { videoUrl, completed } = req.body;

    const [existing] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, req.user.id),
          eq(userProgress.exerciseId, exerciseId)
        )
      );

    if (existing) {
      const [updated] = await db
        .update(userProgress)
        .set({ videoUrl, completed, updatedAt: new Date() })
        .where(eq(userProgress.id, existing.id))
        .returning();
      return res.json(updated);
    }

    const [progress] = await db
      .insert(userProgress)
      .values({
        userId: req.user.id,
        exerciseId,
        videoUrl,
        completed,
      })
      .returning();

    res.json(progress);
  });

  // Submit feedback for an exercise
  app.post("/api/feedback/:progressId", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Not authenticated");
    }

    const progressId = parseInt(req.params.progressId);
    const { content, rating } = req.body;

    // Verify that the progress belongs to the user
    const [userProgressRecord] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.id, progressId),
          eq(userProgress.userId, req.user.id)
        )
      );

    if (!userProgressRecord) {
      return res.status(404).send("Progress record not found");
    }

    const [newFeedback] = await db
      .insert(feedback)
      .values({
        progressId,
        content,
        rating,
      })
      .returning();

    res.json(newFeedback);
  });

  const httpServer = createServer(app);
  return httpServer;
}
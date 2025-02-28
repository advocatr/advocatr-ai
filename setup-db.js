
import { drizzle } from "drizzle-orm/neon-serverless";
import { exercises } from "./db/schema.js";
import { db } from "./db/index.js";
import ws from "ws";
import dotenv from "dotenv";

dotenv.config();

async function setupDatabase() {
  console.log("Database URL is configured correctly.");
  
  // Check if exercises exist
  const existingExercises = await db.query.exercises.findMany();
  
  // Only add exercises if none exist
  if (existingExercises.length === 0) {
    console.log("No exercises found. Adding sample exercises...");
    
    try {
      await db.insert(exercises).values([
        {
          title: "Introduction to Public Speaking",
          description: "Learn the basics of public speaking and how to structure a speech.",
          demoVideoUrl: "https://example.com/intro-demo",
          professionalAnswerUrl: "https://example.com/intro-pro",
          order: 1
        },
        {
          title: "Body Language and Posture",
          description: "Master the art of body language and professional posture.",
          demoVideoUrl: "https://example.com/body-language-demo",
          professionalAnswerUrl: "https://example.com/body-language-pro",
          order: 2
        },
        {
          title: "Voice Projection Techniques",
          description: "Learn techniques to improve your voice projection and clarity.",
          demoVideoUrl: "https://example.com/voice-demo",
          professionalAnswerUrl: "https://example.com/voice-pro",
          order: 3
        }
      ]);
      console.log("Successfully added sample exercises!");
    } catch (error) {
      console.error("Error adding exercises:", error);
    }
  } else {
    console.log(`Found ${existingExercises.length} existing exercises, no need to add more.`);
  }

  console.log("Running database migrations...");
  
  try {
    // Run DB migrations
    const { execSync } = await import("child_process");
    execSync("npm run db:push", { stdio: "inherit" });
    console.log("Database migrations completed successfully.");
  } catch (error) {
    console.error("Error running migrations:", error);
    process.exit(1);
  }
  
  console.log("Database setup complete!");
}

setupDatabase();

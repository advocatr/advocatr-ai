
import { drizzle } from "drizzle-orm/neon-serverless";
import dotenv from "dotenv";
import { users } from "./db/schema.js";
import { eq } from "drizzle-orm";
import ws from "ws";

// Load environment variables
dotenv.config();

async function updateUser() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set. Please configure your database first.');
      process.exit(1);
    }

    // Import db modules
    const db = drizzle({
      connection: process.env.DATABASE_URL,
      schema: { users },
      ws
    });

    // Find Jack Booth's user record
    const [jackBoothUser] = await db
      .select()
      .from(users)
      .where(eq(users.username, "Jack Booth"))
      .limit(1);

    if (!jackBoothUser) {
      console.error("User 'Jack Booth' not found in the database.");
      process.exit(1);
    }

    // Update the user to be an admin
    const [updatedUser] = await db
      .update(users)
      .set({ isAdmin: true })
      .where(eq(users.id, jackBoothUser.id))
      .returning();

    console.log(`User '${updatedUser.username}' (ID: ${updatedUser.id}) has been granted admin privileges.`);
    console.log("They can now access the admin pages at /admin/exercises and /admin/progress");
  } catch (error) {
    console.error('Error updating user:', error);
    process.exit(1);
  }
}

updateUser();

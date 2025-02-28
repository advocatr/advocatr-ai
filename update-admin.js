
import { drizzle } from "drizzle-orm/neon-serverless";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import ws from "ws";

// Load environment variables
dotenv.config();

// Import the schema directly to avoid ES module issues
const usersSchema = {
  id: { name: "id" },
  username: { name: "username" },
  isAdmin: { name: "is_admin" }
};

async function updateUser() {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set. Please configure your database first.');
      process.exit(1);
    }

    // Create db connection
    const db = drizzle({
      connection: process.env.DATABASE_URL,
      schema: { users: usersSchema },
      ws
    });

    // Find Jack Booth's user record
    const [jackBoothUser] = await db
      .select()
      .from({ users: "users" })
      .where(eq(usersSchema.username, "Jack Booth"))
      .limit(1);

    if (!jackBoothUser) {
      console.error("User 'Jack Booth' not found in the database.");
      process.exit(1);
    }

    // Update the user to be an admin
    await db
      .update({ users: "users" })
      .set({ is_admin: true })
      .where(eq(usersSchema.id, jackBoothUser.id));

    console.log(`User '${jackBoothUser.username}' (ID: ${jackBoothUser.id}) has been granted admin privileges.`);
    console.log("They can now access the admin pages at /admin/exercises and /admin/progress");
  } catch (error) {
    console.error('Error updating user:', error);
    process.exit(1);
  }
}

updateUser();

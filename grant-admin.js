
const { Pool } = require('pg');
require('dotenv').config();

async function grantAdminPrivileges() {
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Please configure your database first.');
    process.exit(1);
  }

  // Create a new PostgreSQL client
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Find the user
    const findUserResult = await pool.query(
      `SELECT id, username FROM users WHERE username = $1 LIMIT 1`,
      ['Jack Booth']
    );

    if (findUserResult.rows.length === 0) {
      console.error("User 'Jack Booth' not found in the database.");
      process.exit(1);
    }

    const user = findUserResult.rows[0];

    // Update the user to be an admin
    await pool.query(
      `UPDATE users SET is_admin = true WHERE id = $1`,
      [user.id]
    );

    console.log(`User '${user.username}' (ID: ${user.id}) has been granted admin privileges.`);
    console.log("They can now access the admin pages at /admin/exercises and /admin/progress");
  } catch (error) {
    console.error('Error updating user:', error);
    process.exit(1);
  } finally {
    // Close the connection pool
    await pool.end();
  }
}

grantAdminPrivileges();


import { execSync } from 'child_process';
import fs from 'fs';

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.log('DATABASE_URL is not set. Please create a PostgreSQL database in Replit.');
  console.log('Follow these steps:');
  console.log('1. Open a new tab in Replit and type "Database"');
  console.log('2. Click "create a database"');
  console.log('3. Once created, Replit will set up the DATABASE_URL environment variable');
  process.exit(1);
}

console.log('Database URL is configured correctly.');

// Run database migrations
try {
  console.log('Running database migrations...');
  execSync('npm run db:push', { stdio: 'inherit' });
  console.log('Database migrations completed successfully.');
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
}

console.log('Database setup complete!');

import dotenv from 'dotenv';

// Load environment variables based on the environment
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

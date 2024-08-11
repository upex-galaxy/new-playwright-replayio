import { execSync } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.REPLAY_API_KEY;
if (!apiKey) {
  console.error('REPLAY_API_KEY is not defined in the .env file');
  process.exit(1);
}
execSync(`replay upload-all --api-key ${apiKey}`)
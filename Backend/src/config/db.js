import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

export async function connectDB(uri = config.mongodbUri) {
  if (isConnected || mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout so fallback can engage swiftly if no Mongo daemon
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB not available at ${uri}: ${error.message}`);
    console.info(`[Database] Operating in Resilient In-Memory Fallback mode.`);
    isConnected = false;
    return false;
  }
}

export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

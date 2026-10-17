import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import { Title } from '../models/Title.js';
import { Watchlist } from '../models/Watchlist.js';
import { SAMPLE_TITLES } from '../data/sampleTitles.js';

async function seedDatabase() {
  console.log('[Seeder] Starting database seed process...');
  const connected = await connectDB();

  if (!connected) {
    console.error('[Seeder] Could not connect to MongoDB. Please ensure your MongoDB server or Atlas cluster is reachable.');
    process.exit(1);
  }

  try {
    console.log('[Seeder] Clearing existing titles and watchlist items...');
    await Title.deleteMany({});
    await Watchlist.deleteMany({});

    console.log(`[Seeder] Inserting ${SAMPLE_TITLES.length} sample cinematic titles...`);
    const inserted = await Title.insertMany(SAMPLE_TITLES);

    console.log(`[Seeder] Successfully seeded ${inserted.length} titles into MongoDB!`);
    console.log('Sample titles:');
    inserted.slice(0, 3).forEach(t => console.log(` - [${t.type.toUpperCase()}] ${t.title} (${t.releaseYear}) - Rating: ${t.rating}`));

    await disconnectDB();
    console.log('[Seeder] Process completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('[Seeder] Seeding error:', err);
    await disconnectDB();
    process.exit(1);
  }
}

seedDatabase();

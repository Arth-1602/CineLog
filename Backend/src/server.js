import app from './app.js';
import { config } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { titleService } from './services/titleService.js';

async function startServer() {
  try {
    // 1. Attempt database connection
    console.log(`[CineLog] Initializing backend services (Node: ${process.version})...`);
    const dbOk = await connectDB();

    // 2. Auto-seed sample records if database connected and empty
    if (dbOk) {
      await titleService.seedInitialTitles();
    } else {
      console.log(`[CineLog] Server ready in In-Memory mode with preloaded cinematic sample catalog.`);
    }

    // 3. Start HTTP server
    const server = app.listen(config.port, () => {
      console.log(`\n======================================================`);
      console.log(`🎬 CineLog REST API is running!`);
      console.log(`🌐 Local URL:   http://localhost:${config.port}`);
      console.log(`❤️  Health:      http://localhost:${config.port}/api/health`);
      console.log(`🎞️  Titles:      http://localhost:${config.port}/api/titles`);
      console.log(`🔎 Search:      http://localhost:${config.port}/api/search?q=Dune`);
      console.log(`🔖 Watchlist:   http://localhost:${config.port}/api/watchlist`);
      console.log(`======================================================\n`);
    });

    // Graceful shutdown
    const handleShutdown = async (signal) => {
      console.log(`\n[CineLog] Received ${signal}. Gracefully closing HTTP server and DB connections...`);
      server.close(async () => {
        await disconnectDB();
        console.log('[CineLog] Server closed cleanly.');
        process.exit(0);
      });

      // Force close if graceful shutdown hangs
      setTimeout(() => {
        console.error('[CineLog] Shutdown timed out. Forcing process exit.');
        process.exit(1);
      }, 5000).unref();
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

    return server;
  } catch (err) {
    console.error('[CineLog] Fatal startup error:', err);
    process.exit(1);
  }
}

startServer();

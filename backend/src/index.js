import express from 'express';
import cors from 'cors';
import { Database } from './config/database.js';
import { router as formRoute } from './api/form/routes.js';

const app = express();
const port = process.env.PORT_SERVER || 3000;

/* DB CLOTURE */
// Écoute les signaux de terminaison
process.on('SIGINT', async () => {
    console.log('SIGINT: Fermeture du serveur...');
    const dbInstance = await Database.getInstance();
    await dbInstance.close();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('SIGTERM: Fermeture du serveur...');
    const dbInstance = await Database.getInstance();
    await dbInstance.close();
    process.exit(0);
});

/* MIDDLEWARE */
// Active CORS
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse ...
app.use(express.json()); // les données JSON
app.use(express.urlencoded({ extended: true })); // les données URL-encoded

/* ROUTER */
app.use('/api', formRoute);

/* SERVER START */
app.listen(port, () => {
    console.log(`Serveur backend à l'écoute sur http://localhost:${port}`);
});

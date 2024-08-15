import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config(); // Charge les variables d'environnement à partir du fichier .env

const MONGODB_URL = process.env.MONGODB_URL; // Récupère l'URL de MongoDB
const MONGODB_NAME = process.env.MONGODB_NAME; // Récupère le nom de la base de données

export class Database {
    static instance; // Stocke l'instance unique de la classe
    client = null; // Instance du client MongoDB
    db = null; // Instance de la base de données

    // Méthode pour obtenir l'instance unique de la classe
    static async getInstance() {
        if (!Database.instance) {
            Database.instance = new Database(); // Créer une nouvelle instance si elle n'existe pas
            await Database.instance.connect(); // Connexion à la base de données
        }
        return Database.instance; // Retourner l'instance unique
    }

    // Méthode pour se connecter à la base de données
    async connect() {
        console.log("Connexion à MongoDB..."); // Indiquer que la connexion est en cours
        console.log("MONGODB_URL:", MONGODB_URL); // Afficher l'URL de MongoDB
        console.log("MONGODB_NAME:", MONGODB_NAME); // Afficher le nom de la base de données
        if (!this.client) { // Si le client n'est pas encore créé

            try {
                this.client = await MongoClient.connect(MONGODB_URL);
                console.log("Connecté à MongoDB!"); // Indiquer que la connexion a réussi
                this.db = this.client.db(MONGODB_NAME); // Accéder à la base de données
            } catch (err) {
                console.error("Erreur de connexion à MongoDB:", err); // Afficher l'erreur
                process.exit(1); // Quitter le processus en cas d'erreur de connexion
            }
        }
    }

    // Méthode pour obtenir la connexion à la base de données
    getDb() {
        if (!this.db) {
            throw new Error('La base de données n\'est pas connectée.'); // Vérifier que la base de données est connectée
        }
        return this.db; // Retourner l'instance de la base de données
    }

    // Méthode pour fermer la connexion
    async close() {
        if (this.client) { // Si le client est connecté
            await this.client.close(); // Fermer la connexion
            console.log("Connexion à MongoDB fermée."); // Indiquer que la connexion a été fermée
            this.client = null; // Réinitialiser le client
            this.db = null; // Réinitialiser la base de données
        }
    }
}

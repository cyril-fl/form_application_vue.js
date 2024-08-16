import express from 'express';
import { Database } from '../../config/database.js';
import {isValidEmail, isValidURL, escapeHtml} from "../../custom_method.js";
import { body,validationResult } from 'express-validator';
export const router = express.Router();

/* POST */
router.post('/submit', [
    body('company_name').trim().escape(), // Trim et échappe les caractères spéciaux
    body('company_location').trim().escape(),
    body('company_website')
        .optional({ checkFalsy: true })
        .trim()
        .isURL({ protocols: ['http', 'https'], require_protocol: true }) // Valide que c'est une URL valide
        .customSanitizer(value => encodeURIComponent(decodeURIComponent(value))), // Encode l'URL si nécessaire
    body('application_type').trim().escape(),
    body('application_type_optional')
        .optional({ checkFalsy: true })
        .trim()
        .customSanitizer(value => {
            if (isValidURL(value)) {
                return encodeURIComponent(decodeURIComponent(value));
            } else if (isValidEmail(value)) {
                return value.trim();
            } else {
                return escapeHtml(value); // Sanitizes other strings
            }
        }),
    body('review_status').trim().escape().isInt({ min: 0 }), // Assure que c'est un entier >= 0
    body('review_comment').optional({ checkFalsy: true }).trim().escape(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Retourner 400 avec les erreurs
    }

    const sanitizedData = req.body;

    try {
        const dbInstance = await Database.getInstance(); // Récupérer l'instance de la base de données
        const collection = dbInstance.getDb().collection('appliance_data'); // Remplacez 'appliance_data' par le nom de votre collection

        // Insert data into the collection
        const result = await collection.insertOne(sanitizedData);
        console.log('Données insérées avec succès:', result.insertedId); // Log de l'ID du document inséré

        // Succes msg
        res.status(201).json({ message: 'Formulaire soumis avec succès!', id: result.insertedId });
    } catch (error) {
        console.error('Erreur lors de l\'insertion des données:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' }); // Retourner une erreur 500 en cas d'erreur
    }
});

/* GET */
router.get('/data', async (req, res) => {
    try {
        const dbInstance = await Database.getInstance(); // Récupérer l'instance de la base de données
        const collection = dbInstance.getDb().collection('appliance_data'); // Nom de votre collection

        const data = await collection.find({}).toArray(); // Récupérer toutes les entrées de la collection

        // Vérifier si des données ont été trouvées
        if (data.length === 0) {
            return res.status(404).json({ message: 'Aucune donnée trouvée.' });
        }

        res.status(200).json(data); // Retourner les données avec un statut 200
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' }); // Retourner une erreur 500 en cas d'erreur
    }
});
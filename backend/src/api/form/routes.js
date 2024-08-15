import express from 'express';
import { Database } from '../../config/database.js';
import {isValidURL} from "../../custom_method.js";
import { body, validationResult } from 'express-validator';

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
            return isValidURL(value) ? encodeURIComponent(decodeURIComponent(value)) : value.escape() ;
        }),
    body('review_status').trim().escape().isInt({ min: 0 }), // Assure que c'est un entier >= 0
    body('review_comment').optional({ checkFalsy: true }).trim().escape(),
], async (req, res) => {
    // Gestion des erreurs de validation

    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Retourner 400 avec les erreurs
    }

    // Données sanitisées
    const sanitizedData = req.body;
    console.log('Données reçues et sanitisées :', sanitizedData);

    /* Todo: formatter dans une classe si besoin avec un controller et un model controller:
    -> controller(data)
    -> transforme les données
    -> model(data)
    -> retourne les données formatées
    -> envoie les données formatées à la base de données

    ?? Est vraiment obligés ? tout est deja ok
     */

    try {
        const dbInstance = await Database.getInstance(); // Récupérer l'instance de la base de données
        const collection = dbInstance.getDb().collection('appliance_data'); // Remplacez 'appliance_data' par le nom de votre collection

        // Insérer les données dans la collection
        const result = await collection.insertOne(sanitizedData);
        console.log('Données insérées avec succès:', result.insertedId); // Log de l'ID du document inséré

        // Retourner un message de succès
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
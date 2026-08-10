# Woubou

Site public de Woubou avec espace privé de suivi du trafic et des demandes de contact.

## Installation

```bash
npm install
```

Copier `.env.example` vers `.env` puis renseigner :

- `ADMIN_DASHBOARD_KEY` : clé secrète utilisée pour ouvrir `/admin` ;
- `RESEND_API_KEY` : clé API Resend ;
- `CONTACT_NOTIFICATION_EMAIL` : adresse qui reçoit les nouvelles demandes ;
- `CONTACT_FROM_EMAIL` : expéditeur utilisant un domaine vérifié dans Resend.

## Développement

Une seule commande démarre le site et l’API :

```bash
npm run dev
```

Le site est disponible sur `http://localhost:3000` et les rapports sur `http://localhost:3000/admin`.

Les commandes `npm run dev:web` et `npm run dev:api` restent disponibles pour lancer les deux services séparément.

## Production

```bash
npm run build
npm start
```

Le serveur Express sert le dossier `dist`, collecte les visites, conserve les demandes dans `data/` et envoie les notifications via Resend.

> Le stockage JSON convient à une instance Node unique. Pour un déploiement multi-instance ou serverless, remplacer `data/` par une base de données persistante.

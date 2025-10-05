# QCM Formation Pharmacie - Bloc 2

QCM interactif pour la formation pharmacie sur les thèmes suivants :
- **P2.1** : Entretien femme enceinte
- **P2.2** : Antalgiques opioïdes (palier II)
- **P2.3** : Asthme
- **P2.4** : AVK (Anti-vitamine K)
- **P2.5** : AOD (Anticoagulants oraux directs)

## 🚀 Déploiement

### Prérequis
- Node.js 18+ installé
- Compte GitHub
- Compte Vercel

### Installation locale

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build
```

### Déployer sur Vercel

#### Option 1 : Via CLI Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

#### Option 2 : Via l'interface Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer le repository GitHub
4. Vercel détectera automatiquement Vite
5. Cliquer sur "Deploy"

### Déployer sur GitHub

```bash
# Initialiser le repo (si pas déjà fait)
git init

# Ajouter le remote
git remote add origin https://github.com/danamzallag-lab/QCM-QUE-FEMME-ENCEINTE-.git

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Initial commit - QCM Bloc 2"

# Push sur GitHub
git push -u origin main
```

## 📁 Structure du projet

```
qcm/
├── index.html                                          # Page principale
├── qcm_interactif_bloc_2_femme_enceinte_opioides_asthme_avk_aod_tsx.jsx
├── qcm_interactif_aod_style_clair_tsx.jsx
├── qcm_interactif_asthme_style_clair_tsx.jsx
├── qcm_interactif_avk_style_sombre_tsx.jsx
├── qcm_p_2_1_p_2.md                                   # Contenu des QCM
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```

## 🎯 Fonctionnalités

- QCM interactif avec feedback immédiat
- Support des questions Vrai/Faux, QCU et QCM
- Design moderne et responsive
- Thèmes clair/sombre
- Suivi de progression
- Score en temps réel

## 📝 License

MIT

## 👤 Auteur

Formation Pharmacie - Bloc 2

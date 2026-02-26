# PSC Supersprint 🏊‍♂️🚴‍♂️🏃‍♂️

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Application web pour gérer et afficher les résultats d'une compétition de triathlon supersprint.

🔗 **Production**: [psc-supersprint.vercel.app](https://psc-supersprint.vercel.app/)

## ✨ Fonctionnalités

- 📊 Affichage des résultats en temps réel
- 🏆 Classements par catégorie, genre et scratch
- 🥇 Visualisation des podiums
- 👤 Fiches individuelles des athlètes
- 📱 Interface responsive (mobile-first)
- 🔐 Interface d'administration pour saisir les résultats

## 🚀 Quick Start

### Prérequis

- **Node.js** ≥ 20.9.0
- **Yarn** ≥ 1.22.0

### Installation

```bash
# Cloner le repository
git clone https://github.com/Mitchnsun/psc-supersprint.git
cd psc-supersprint

# Installer les dépendances
yarn install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos credentials Firebase

# Lancer le serveur de développement
yarn dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 📜 Scripts disponibles

| Commande          | Description                             |
| ----------------- | --------------------------------------- |
| `yarn dev`        | Serveur de développement avec Turbopack |
| `yarn build`      | Build de production                     |
| `yarn start`      | Serveur de production                   |
| `yarn test`       | Exécuter les tests avec coverage        |
| `yarn test:watch` | Tests en mode watch                     |
| `yarn lint`       | Vérification ESLint                     |

## 🏗️ Architecture

```
app/                    # Next.js App Router (pages)
├── layout.tsx          # Layout racine (Server Component)
├── providers.tsx       # Providers client-side
├── admin/              # Section administration
├── athlete/[year]/[id] # Résultats individuels
├── live/               # Résultats en direct
├── podiums/[year]/     # Podiums par année
└── resultats/[year]/   # Résultats par année

components/             # Composants React
├── ui/                 # Composants shadcn/ui (Button, Input, etc.)
├── atoms/              # Composants atomiques (icons, etc.)
└── *.tsx               # Composants métier

lib/                    # Configuration & utilitaires
├── firebase.ts         # Config Firebase
└── utils.ts            # Helpers (cn, etc.)

utils/                  # Logique métier
├── types.ts            # Types TypeScript
├── time.ts             # Formatage temps
├── categories.utils.ts # Gestion catégories
└── context/            # Contexts React

views/                  # Composants de vue (page-level)
tests/                  # Configuration tests
```

## 🛠️ Tech Stack

| Catégorie      | Technologies               |
| -------------- | -------------------------- |
| **Framework**  | Next.js 16 (App Router)    |
| **UI**         | React 19                   |
| **Language**   | TypeScript 5.1+            |
| **Styling**    | Tailwind CSS v4            |
| **Components** | Radix UI + shadcn/ui       |
| **Forms**      | React Hook Form + Yup      |
| **Database**   | Firebase Realtime Database |
| **Testing**    | Vitest + Testing Library   |

## ⚙️ Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine:

```bash
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Path Aliases

Les imports utilisent des alias configurés dans `tsconfig.json`:

```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Time from '@/utils/time';
```

## 🧪 Tests

```bash
# Exécuter tous les tests
yarn test

# Mode watch pour le développement
yarn test:watch

# Avec interface UI
yarn test --ui
```

Les tests utilisent **Vitest** avec **Testing Library** et sont configurés dans `vitest.config.ts`.

## 📝 Conventions de code

- **Server Components** par défaut dans `/app`
- **Client Components** avec `'use client'` quand nécessaire
- Pattern `page.client.tsx` pour séparer logique client des pages
- Styling avec Tailwind et `cn()` pour les classes conditionnelles
- Types définis dans `@/utils/types.ts`

Pour plus de détails, voir [.github/copilot-instructions.md](.github/copilot-instructions.md).  
Pour le workflow d'orchestration IA, voir [AI_WORKFLOW.md](AI_WORKFLOW.md).

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Développer la fonctionnalité
4. Ajouter des tests pour le nouveau code
5. Vérifier le formatage et le linting :
   ```bash
   yarn lint          # Vérifier ESLint
   yarn test          # Exécuter les tests
   ```
6. Commit les changements (`git commit -m 'Add amazing feature'`)
7. Push la branche (`git push origin feature/amazing-feature`)
8. Ouvrir une Pull Request

### Checklist avant PR

- [ ] Les tests passent (`yarn test`)
- [ ] Le code respecte les règles ESLint (`yarn lint`)
- [ ] Les nouveaux fichiers suivent les conventions de nommage
- [ ] Les types TypeScript sont correctement définis

## 📄 License

ISC

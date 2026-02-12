# Copilot Instructions - PSC Supersprint

## Project Overview

PSC Supersprint est une application web pour gérer et afficher les résultats d'une compétition de triathlon supersprint. L'application permet de visualiser les classements, les podiums et les résultats individuels des athlètes.

## Tech Stack

- **Framework**: Next.js 16 avec App Router
- **UI**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Realtime Database
- **Forms**: React Hook Form + Yup pour la validation
- **UI Components**: Radix UI primitives + shadcn/ui pattern
- **Testing**: Vitest + Testing Library
- **Package Manager**: Yarn

## Project Structure

```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout (Server Component)
├── page.tsx            # Home page
├── providers.tsx       # Client-side providers wrapper
├── admin/              # Admin section
├── athlete/[year]/[id] # Individual athlete results
├── live/               # Live results page
├── podiums/[year]/     # Podiums by year
└── resultats/[year]/   # Results by year

components/             # React components
├── ui/                 # shadcn/ui base components (Button, Input, Select, etc.)
├── atoms/              # Atomic design components (icons, small UI elements)
└── *.tsx               # Feature components

lib/                    # Library utilities
├── firebase.ts         # Firebase configuration
└── utils.ts            # General utilities (cn function for classnames)

utils/                  # Business logic utilities
├── types.ts            # TypeScript type definitions
├── time.ts             # Time formatting utilities
├── categories.utils.ts # Category management
├── constants.ts        # App constants
└── context/            # React contexts

views/                  # View components (page-level components)
tests/                  # Test setup files
```

## Code Conventions

### File Naming

- Components: `PascalCase.tsx` (ex: `ResultCard.tsx`)
- Utilities: `camelCase.ts` (ex: `time.ts`)
- Tests: `*.test.ts` ou `*.test.tsx`
- Pages client: `page.client.tsx` pour les Client Components de pages

### Component Patterns

- **Server Components** par défaut dans `/app`
- **Client Components** marqués avec `'use client'` en haut du fichier
- Pattern `.client.tsx` pour séparer la logique client des pages

### Imports

Utiliser les alias de path configurés dans `tsconfig.json`:

```typescript
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Time from '@/utils/time';
import { ResultType } from '@/utils/types';
```

### Styling

- Utiliser Tailwind CSS pour le styling
- Utiliser la fonction `cn()` de `@/lib/utils` pour combiner les classes conditionnellement
- Suivre le pattern shadcn/ui pour les composants UI avec `class-variance-authority`

```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-classes', { 'conditional-class': condition })} />;
```

### Forms

- Utiliser React Hook Form avec yupResolver
- Définir les schémas Yup séparément
- Typer les formulaires avec `yup.InferType<typeof schema>`

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({...});
type FormValues = yup.InferType<typeof schema>;

const { control, handleSubmit } = useForm<FormValues>({
  resolver: yupResolver(schema),
});
```

### Firebase

- Importer la configuration depuis `@/lib/firebase`
- Utiliser les fonctions Firebase modular SDK (`push`, `ref`, `set`, etc.)

```typescript
import db from '@/lib/firebase';
import { push, ref, set } from 'firebase/database';
```

## Types

Définir les types dans `@/utils/types.ts`. Types principaux:

- `ResultType`: Résultat d'un athlète
- `RanksType`: Classements d'un athlète
- `SearchType`: Paramètres de recherche

## Testing

- Framework: Vitest avec JSDOM
- Setup: `tests/setup.ts`
- Pattern de test: `describe` / `test` / `expect`

```typescript
import { describe, test, expect } from 'vitest';

describe('Feature', () => {
  test('should do something', () => {
    expect(result).toBe(expected);
  });
});
```

Commandes:

- `yarn test` - Exécuter les tests avec coverage
- `yarn test:watch` - Mode watch

## Language

- Interface utilisateur en **français**
- Code et commentaires en **anglais**
- Variables et fonctions en **anglais**

## Environment Variables

Variables Firebase requises (préfixées `NEXT_PUBLIC_`):

- `NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Best Practices

1. **Toujours typer** les props des composants et les retours de fonctions
2. **Éviter `any`** - utiliser des types spécifiques ou `unknown`
3. **Extraire la logique** dans des hooks personnalisés ou des utils
4. **Composants petits** - un composant = une responsabilité
5. **Préférer les Server Components** sauf si état/effets client nécessaires
6. **Tester les utilitaires** - les fonctions dans `/utils` doivent avoir des tests

## Qualité du code

### Avant chaque commit

- Vérifier que les tests passent: `yarn test`
- Vérifier le linting ESLint: `yarn lint`

### Règles ESLint

Le projet utilise une configuration ESLint stricte basée sur:

- `eslint-config-airbnb`
- `eslint-config-next`
- `eslint-config-prettier`

### Checklist pour les nouvelles fonctionnalités

- [ ] Tests unitaires ajoutés pour la nouvelle logique
- [ ] Types TypeScript correctement définis (pas de `any`)
- [ ] Code conforme aux règles ESLint
- [ ] Composants suivent les conventions de nommage
- [ ] Imports utilisent les alias de path (`@/components`, etc.)

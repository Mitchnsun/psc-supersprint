# PSC Supersprint

## Migration to Next.js 16 and React 19

This project has been migrated to Next.js 16 and React 19. Below are the key changes and important notes:

### Updated Dependencies

- **Next.js**: Upgraded from 14.2.x to 16.1.6
- **React & React DOM**: Upgraded from 18.3.1 to 19.2.4
- **TypeScript**: Upgraded from 4.9.4 to 5.1.0+ (required by Next.js 16)
- **@testing-library/react**: Upgraded from 14.2.1 to 16.3.2 for React 19 support
- **@vitejs/plugin-react**: Upgraded from 4.2.1 to 5.1.3
- **react-hook-form**: Upgraded from 7.41.0 to 7.71.1
- **@hookform/resolvers**: Upgraded from 2.9.10 to 5.2.2
- **yup**: Upgraded from 0.32.11 to 1.4.0
- **eslint-config-next**: Upgraded from 14.2.24 to 16.1.6

### Breaking Changes Addressed

1. **TypeScript Configuration**:

   - Updated `moduleResolution` to `"bundler"` for better ES module support
   - Updated `jsx` to `"react-jsx"` (Next.js now uses React automatic runtime)
   - Added `.next/dev/types/**/*.ts` to include paths

2. **Dynamic Imports in Server Components**:

   - Removed `{ ssr: false }` option from `next/dynamic` in server components
   - The `Share` component import in `/athlete/[year]/[id]/page.tsx` now uses a direct import since it's already a client component

3. **Type Definitions**:
   - Added `@types/lodash` for TypeScript support
   - Updated form type definitions in `AddResult.tsx` to match yup schema inference
   - Fixed numeric field types (`bib`, `birthYear`) to match schema expectations

### Environment Variables

The project requires Firebase configuration through environment variables. Create a `.env.local` file with the following variables:

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

### Running the Project

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Run production server
yarn start

# Run tests
yarn test

# Lint code
yarn lint
```

### Next.js 16 Features

This project now benefits from Next.js 16 features including:

- **Turbopack** as the default bundler (faster builds and HMR)
- Improved TypeScript support with better type inference
- Enhanced performance and optimization

### React 19 Features

React 19 brings several improvements:

- Better concurrent rendering
- Improved type definitions
- New hooks like `useActionState`, `useFormStatus` (available for future use)
- React Server Components are now stable

### Testing

All existing tests pass with the new versions. The test suite uses Vitest with React Testing Library 16.3.2, which fully supports React 19.

### Notes

- Minimum Node.js version required: **20.9.0 or later**
- Minimum TypeScript version: **5.1.0**
- All dynamic pages use `export const dynamic = 'force-dynamic'` to ensure proper server-side rendering

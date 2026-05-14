# My Vocabulary

A small React app for saving personal vocabulary words. Authentication and word storage are powered by Firebase Auth and Cloud Firestore.

## Requirements

- Node.js and npm
- A Firebase project with Email/Password authentication enabled
- A Firestore database

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill it with values from your Firebase web app settings:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   npm start
   ```

## Available scripts

- `npm start` — run the app locally.
- `npm run build` — create a production build in `build/`.
- `npm test` — launch the Create React App test runner.
- `npm run deploy` — publish the production build to GitHub Pages.

## Recommended Firestore shape

Words are stored per user under:

```text
users/{userId}/words/{wordId}
```

Each word document contains:

- `word` — the original word.
- `translation` — the translation.
- `createdAt` — server timestamp used for ordering.

## Suggested next steps

- Add edit and search/filter features for saved words.
- Add language fields and tags so users can organize vocabulary by topic.
- Add tests for authentication, word creation, deletion, and date formatting.
- Replace Create React App with a maintained toolchain such as Vite when the project grows.
- Add Firebase security rules and document them in the repository before production use.

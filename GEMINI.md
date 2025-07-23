# Project Overview

This project is a web application built with React, leveraging Vite for a fast development experience. It uses TypeScript for type safety, Tailwind CSS for styling, and Zustand for state management. The application structure follows a modular approach, separating concerns like routing, API configurations, and UI components.

## Tech Stack

-   **Framework**: React (with TypeScript)
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS, PostCSS, Autoprefixer
-   **State Management**: Zustand
-   **Routing**: React Router DOM
-   **HTTP Client**: Axios
-   **Linting**: ESLint (with `@typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
-   **Package Manager**: Yarn (v4.x)
-   **API Client**: React Query (for data fetching and caching)

## Project Structure

-   `public/`: Static assets.
-   `src/`:
    -   `assets/`: Static assets like fonts and images.
    -   `components/`: Reusable UI components, including a `ui` directory for Shadcn-like components and a `common` directory for more generic components.
    -   `config/`: API configurations, HTTP client setup, and custom hooks related to API interactions.
    -   `constants/`: Application-wide constants.
    -   `hooks/`: Custom React hooks (e.g., `useAuth`).
    -   `languages/`: Internationalization (i18n) files (e.g., `en.json`, `ko.json`).
    -   `pages/`: Top-level page components, often containing specific logic or layouts (e.g., `error-boundary`, `pageNotFound`).
    -   `routes/`: Application routing logic, including `AppRouter`, route configurations, and layout components (`AuthenticateLayout`, `GlobalLayout`, `ProtectedLayout`).
    -   `stores/`: Global state management using Zustand (e.g., `authStore.ts`).
    -   `styled/`: Styled components or global styling configurations.
    -   `theme/`: Theming configurations (palette, typography, components).
    -   `types/`: TypeScript type definitions.
    -   `utils/`: Utility functions and helpers (e.g., environment variables, persistent cache).
    -   `App.tsx`: Main application component.
    -   `main.tsx`: Entry point for the React application.

## Available Scripts

-   `yarn dev`: Starts the development server with Vite.
-   `yarn build`: Builds the application for production, compiling TypeScript and bundling assets.
-   `yarn lint`: Runs ESLint to check for code quality and style issues.
-   `yarn preview`: Serves the production build locally for previewing.

## Coding Conventions

-   **Linting**: ESLint is configured to enforce code style and best practices for TypeScript and React. Refer to `.eslintrc.cjs` for specific rules.
-   **Formatting**: Prettier is likely used for code formatting (indicated by `.prettierrc.json` and `.prettierignore`).
-   **TypeScript**: Strict TypeScript rules are enforced (`tsconfig.json`).
-   **Component Structure**: Components are typically found in `src/components/` and `src/pages/`.

## Key Modules/Features

-   **Authentication**: Handled via `src/hooks/useAuth.ts`, `src/stores/authStore.ts`, and `src/routes/ProtectedRoute.tsx`.
-   **API Integration**: Centralized in `src/config/` with `axiosInstance.ts`, `httpClient.ts`, and `Service.ts`. React Query hooks are in `src/config/cryptoHooks.ts`.
-   **Internationalization**: Supported by `src/languages/`.
-   **Routing**: Managed by `react-router-dom` with defined routes in `src/routes/routes.tsx` and layouts in `src/routes/`.
-   **UI Components**: Reusable components are organized under `src/components/ui/` and `src/components/common/`.
-   **Crypto Page**: `src/CryptoPage.tsx` suggests a dedicated page for cryptocurrency-related features.
-   **Login Form**: `src/LoginForm.tsx` indicates a dedicated component for user login.

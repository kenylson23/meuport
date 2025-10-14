# Overview

This is a modern 3D interactive portfolio application for Kenylson Lourenço, a Full Stack Developer. The application features a stunning three-dimensional interface with WebGL/Three.js rendering, cyberpunk/neon aesthetic, and interactive elements including audio feedback, particle systems, and animated components. The portfolio showcases skills, projects, and experience through immersive 3D visualizations and smooth animations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application uses a React-based frontend with TypeScript, built on top of Vite for fast development and optimized bundling. The frontend is organized into several key architectural layers:

**Component Structure**: Modular component architecture with sections for Hero, About, Skills, Projects, and Contact. Each section includes interactive 3D elements and animations using Framer Motion and Three.js React Fiber.

**3D Rendering Engine**: Built with @react-three/fiber (React wrapper for Three.js) and @react-three/drei for additional 3D utilities. Includes custom 3D components like FloatingGeometry, ParticleField, LanguageModel3D, and various interactive visualizations.

**Styling System**: Uses Tailwind CSS for utility-first styling combined with custom neon/cyberpunk CSS effects. Includes a comprehensive design system with Radix UI components for accessibility and consistent interactions.

**State Management**: Utilizes Zustand stores for managing global application state including audio controls, portfolio navigation, and user preferences. React Query handles server state management and data fetching.

**Animation Framework**: Framer Motion provides smooth animations and transitions throughout the interface, with particular focus on scroll-triggered animations and hover effects.

## Backend Architecture

**Express.js Server**: Lightweight Node.js server using Express with TypeScript. Configured with custom middleware for request logging and error handling.

**Database Layer**: Uses Drizzle ORM with PostgreSQL database support. Schema is shared between client and server using the shared directory structure.

**Storage Interface**: Implements a flexible storage interface with both in-memory storage for development and database storage for production. Currently includes basic user management functionality.

**API Structure**: RESTful API endpoints prefixed with /api. Routes are modularized and registered through the registerRoutes function.

## Data Storage Solutions

**Database**: PostgreSQL database configured through environment variables with Drizzle ORM for type-safe database operations.

**Schema Management**: Shared schema definitions using Drizzle with automatic TypeScript type generation. Includes migration support through drizzle-kit.

**Development Storage**: In-memory storage implementation for rapid development and testing without database dependencies.

## Authentication and Authorization

Basic user authentication structure is in place using the shared user schema. The system is designed to support session-based authentication with extensible user management capabilities.

## Design System

**Neon Theme**: Custom CSS variables and utilities for neon green cyberpunk aesthetic with glow effects and futuristic styling.

**Typography**: Uses Orbitron font family for the futuristic, tech-focused design language.

**Component Library**: Comprehensive UI component library based on Radix UI primitives with custom styling to match the neon theme.

## SEO and Accessibility

**Search Engine Optimization**: Valid robots.txt file in client/public allowing crawler access. Enhanced HTML meta tags including description, robots directive, author, Open Graph tags for social sharing, and Twitter Card support. Portuguese locale (pt-BR) specified for proper language targeting.

**WCAG Compliance**: Accessibility improvements including viewport zoom enabled, comprehensive ARIA labels on interactive elements (audio controls, navigation), accessible tab patterns in modals with proper role/aria-controls/tabindex management, and semantic HTML structure. All interactive elements have descriptive aria-labels in Portuguese.

# External Dependencies

**3D Graphics**: Three.js ecosystem including @react-three/fiber, @react-three/drei, and @react-three/postprocessing for advanced 3D rendering and effects.

**Database Services**: Neon Database (@neondatabase/serverless) for PostgreSQL hosting with serverless capabilities.

**UI Framework**: Radix UI component library providing accessible, unstyled UI primitives that are customized with the neon theme.

**Animation Libraries**: Framer Motion for React animations and transitions, providing smooth interactive experiences.

**Audio Processing**: Custom audio management system for interactive sound effects and background music.

**Development Tools**: Vite for fast development builds, TypeScript for type safety, and various development utilities including runtime error overlays.

**Styling**: Tailwind CSS for utility-first styling, PostCSS for processing, and custom CSS for neon effects.

**State Management**: Zustand for lightweight state management and React Query for server state and data fetching.

**Build Tools**: ESBuild for production server bundling, Drizzle Kit for database migrations, and various TypeScript configuration tools.
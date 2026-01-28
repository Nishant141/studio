# **App Name**: LeadStream

## Core Features:

- User Authentication: Secure user authentication using Firebase Authentication with email/password and Google login. Role-based access control (Admin, Viewer) is implemented to restrict access to sensitive data and functionalities.
- Leads Table: Display a responsive table of leads with company, contact, email, industry, region, status, source, and creation date. Implement search, sort, and pagination for easy data navigation and management.
- Lead Filtering: Enable filtering of leads by date range, industry, region, and status to quickly identify and focus on specific lead segments.
- Data Visualization: Visualize key lead metrics with charts displaying total leads, leads by source, conversion rate, and daily/weekly trends. Precomputed metrics are stored in Firestore to ensure charts load quickly.
- Lead Creation and Updates: Implement Firebase Cloud Functions to handle lead creation and status updates. Secure Firestore rules are enforced to prevent unauthorized data access.
- Data Seeding: Seed the database with demo data (200+ leads) to provide users with a realistic sample dataset for testing and demonstration purposes.
- Activity tracking tool: LLM reasons if some lead activities seem fishy, or suggest follow up actions based on observed trends in the 'activities' collection

## Style Guidelines:

- Primary color: A muted blue (#6699CC) to evoke a sense of trust and professionalism.
- Background color: A light, desaturated blue (#E6EEF2) for a clean and calming backdrop.
- Accent color: A contrasting orange (#FFA07A) for call-to-action buttons and important highlights.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text, providing a modern and readable experience.
- Use clean, minimalist icons to represent different data categories and actions.
- Design a clean, intuitive dashboard layout that provides easy access to key metrics and lead management tools.
- Incorporate subtle animations for data updates and transitions to enhance user engagement without being distracting.
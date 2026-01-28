# LeadStream - AI-Powered Sales Leads Dashboard

## Overview

LeadStream is a production-ready, full-stack Sales Leads Dashboard built with Next.js. It provides a comprehensive interface for managing and analyzing sales leads, helping sales teams to streamline their workflow, identify high-potential leads, and make data-driven decisions.

The application leverages Google's Genkit for its AI capabilities, offering intelligent analysis of lead activities to provide actionable insights.

## Features

*   **Interactive Dashboard:** Get a quick overview of key metrics like total leads, conversion rates, and new leads for the month with visually appealing charts.
*   **Comprehensive Leads Table:** View, search, sort, and filter all your leads in a responsive and powerful data table.
*   **AI-Powered Activity Analysis:** Leverage generative AI to analyze a lead's activity history, detect potentially suspicious behavior, and receive suggestions for optimal follow-up actions.
*   **Modern UI/UX:** Built with ShadCN UI and Tailwind CSS for a clean, modern, and fully responsive user experience.
*   **Authentication:** A secure login page to control access to the dashboard.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **AI:** [Google's Genkit](https://firebase.google.com/docs/genkit)
*   **UI:** [React](https://react.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Charting:** [Recharts](https://recharts.org/)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

*   Node.js (v20 or higher recommended)
*   npm (or your preferred package manager)

### Installation & Running Locally

1.  **Clone the repository and install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the root of the project. You will need to add your Google AI API key for the Genkit features to work.
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

3.  **Run the main application server:**
    This will start the Next.js development server, typically on `http://localhost:9002`.
    ```bash
    npm run dev
    ```

4.  **Run the Genkit AI server:**
    For the AI features to work, you must run the Genkit development server in a separate terminal. This will run on `http://localhost:10001` and expose the AI flows.
    ```bash
    npm run genkit:dev
    ```

5.  **Open the application:**
    Navigate to [http://localhost:9002](http://localhost:9002) in your browser.

### Login Credentials

Use the following demo credentials to log in to the application:

*   **Email:** `admin@leadstream.com`
*   **Password:** `password`

## Project Structure

```
.
├── src
│   ├── ai                  # Genkit AI flows and configuration
│   ├── app                 # Next.js App Router pages and layouts
│   ├── components          # Reusable React components (UI, layout, etc.)
│   ├── hooks               # Custom React hooks
│   ├── lib                 # Core logic, API functions, types, and seed data
│   └── ...
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.ts          # Next.js configuration
```

# AeroAutomateAI - AI-Powered Sales & Marketing Platform

AeroAutomateAI is a modern, web-based application designed to showcase the power of integrating AI into sales and marketing workflows. This platform features several AI-driven tools, including a LinkedIn profile scraper, an autodialer simulation, and a content generation engine for a blog.

The entire application is built with a modern tech stack, prioritizing developer experience and performance.

**Live Demo:** [Link to your live deployed application]

---

## Key Features

- **AI Co-pilot:** An interactive prompt on the dashboard that understands natural language commands (e.g., "call 1-800-555-1234") to initiate actions.
- **LinkedIn Profile Scraper:** A tool that accepts a list of LinkedIn profile URLs and uses a Genkit AI flow to generate plausible (but fake) profile summaries, titles, and locations.
- **Autodialer Simulation:** A UI that simulates an automated dialing session for a list of phone numbers, showing real-time status updates for each call.
- **AI Blog Generator:** A complete content management section where you can generate full blog articles by simply providing a title and optional notes. The AI handles the entire writing process.
- **Modern & Responsive UI:** The interface is built with ShadCN UI and Tailwind CSS, ensuring it's clean, functional, and looks great on any device.

---

## Technology Stack

This project was built with a focus on cutting-edge, yet stable technologies to demonstrate a realistic enterprise-grade application.

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit) (with Google's Gemini model)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Deployment:** [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/AeroAutomateAI.git
    cd AeroAutomateAI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3.  **Set up Environment Variables:**
    This project uses Genkit, which connects to Google's AI services. You will need to obtain an API key for the Gemini model.

    - Create a file named `.env.local` in the root of the project.
    - Add your API key to this file:
      ```
      GEMINI_API_KEY=your_api_key_here
      ```
    - You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    The application runs with two concurrent processes: the Next.js frontend and the Genkit AI flows.

    - In your first terminal, start the Next.js development server:
      ```bash
      npm run dev
      ```
    - In a second terminal, start the Genkit development server:
      ```bash
      npm run genkit:watch
      ```
    - Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

---

## Deployment

This application is configured for easy deployment to **Firebase App Hosting**.

To deploy the application, you'll need the [Firebase CLI](https://firebase.google.com/docs/cli).

1.  **Login to Firebase:**
    ```bash
    firebase login
    ```

2.  **Deploy the backend:**
    From the project root, run the deployment command:
    ```bash
    firebase apphosting:backends:deploy
    ```
    The CLI will guide you through selecting a Firebase project and region. Once completed, it will provide you with the live URL for your application.

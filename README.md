
# AeroAutomateAI - An AI-Powered Sales & Marketing Toolkit

Hey there! Thanks for checking out AeroAutomateAI. I built this project to explore how modern AI, specifically large language models, can be integrated into a realistic web application for sales and marketing tasks. It's a hands-on demonstration of combining a sleek frontend with powerful, custom AI-driven backend flows.

The whole platform is built on a modern, production-ready stack. You can see it live here: **[Link to your live demo]**

---

### So, What Can It Do?

I've implemented a few core features that showcase different AI capabilities:

*   **🤖 AI Co-pilot:** A command-line interface on the dashboard. It's a proof-of-concept for intent recognition, currently set up to understand a command like `"call 1-800-555-1234"` and kick off an action.
*   **📄 LinkedIn Profile "Scraper":** You can feed it a list of LinkedIn profile URLs, and it uses an AI flow to generate plausible (but entirely fake) profile data. It's a neat way to show how AI can generate structured data from a simple input.
*   **📞 Autodialer Simulation:** This screen mimics a real-world autodialer, running through a list of numbers and showing real-time status updates for each call.
*   **✍️ AI Blog Generator:** This is a full-featured content generation engine. Just give it a title and some optional notes, and the AI will write a complete, structured blog article, ready for publishing.

---

### The Tech Stack

I chose these technologies to create a modern, performant, and developer-friendly application.

*   **Framework:** **Next.js** (using the App Router). It's fantastic for building fast, server-rendered React apps.
*   **Language:** **TypeScript**. For type safety and a much more robust codebase.
*   **AI Integration:** **Google's Genkit** (with the Gemini model). This is the heart of the AI functionality, allowing me to define and run custom AI flows on the server.
*   **UI & Styling:** **ShadCN UI** and **Tailwind CSS**. This combination is amazing for building beautiful, responsive, and accessible components without writing tons of custom CSS.
*   **Deployment:** Pre-configured for **Firebase App Hosting**.

---

### Getting It Running Locally

Want to fire it up on your own machine? Here’s how.

**1. Prerequisites:**
*   You'll need **Node.js** (v18 or later is best).
*   A package manager like `npm` or `yarn`.

**2. Clone & Install:**

First, clone the repository to your local machine and navigate into the directory:
```bash
git clone https://github.com/your-username/AeroAutomateAI.git
cd AeroAutomateAI
```
Then, install all the necessary dependencies:
```bash
npm install
```

**3. Set Up Your API Key:**

The AI features are powered by Google's Gemini model. You'll need an API key to make it work.

*   You can get a free key from **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
*   Create a new file in the root of the project called `.env.local`.
*   Add your key to this file like so:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

**4. Run the Development Servers:**

This app has two parts that need to run at the same time: the Next.js frontend and the Genkit AI server.

*   **Terminal 1 (Frontend):**
    ```bash
    npm run dev
    ```
*   **Terminal 2 (AI Flows):**
    ```bash
    npm run genkit:watch
    ```

Once both are running, open **[http://localhost:9002](http://localhost:9002)** in your browser to see the app in action.

---

### Deployment

I've set this project up for a super smooth deployment to **Firebase App Hosting**. Once you have the [Firebase CLI](https://firebase.google.com/docs/cli) installed and you're logged in, you can deploy the entire backend with a single command:

```bash
firebase apphosting:backends:deploy
```

The CLI will walk you through the rest. It's a really powerful way to get a full-stack Next.js app live in minutes.

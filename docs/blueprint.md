# **App Name**: AeroAutomateAI

## Core Features:

- LinkedIn Profile Scraper: Scrape LinkedIn profile data (full name, title, location, about, experience, skills) from a list of provided URLs, saving the data to a downloadable CSV file.  It will attempt login via Google if necessary.
- Automated Phone Dialer: Dial phone numbers automatically from a list, logging results (call status, duration, timestamp) in Firestore. Provides a UI to upload a CSV or manually enter phone numbers.
- AI-Powered Call Prompt: An AI prompt to specify phone calls. It will parse natural language instructions like "call 9876543210" using the Gemini API, triggering the call to the extracted number.
- AI Article Generator: Generate blog content using the Gemini API based on provided titles and optional notes. Save the articles to Firestore for publishing on the blog.
- Blog Publication: Publish articles generated from AI in /blog section with dynamic routes `/blog/[slug].
- Dashboard Overview: Display key metrics such as total calls made, call success rate, and total articles generated in the dashboard.  It also displays the AI prompt box on the homepage.

## Style Guidelines:

- Primary color: Blue (#3498DB) to represent trust and automation.
- Accent color: Orange (#E67E22) for highlights and calls to action, contrasting with the primary blue.
- Background color: Light gray (#ECF0F1) for a clean, modern, neutral aesthetic.
- Headline Font: 'Space Grotesk' (sans-serif) for a modern and technical look, suitable for headlines.
- Body Font: 'Inter' (sans-serif) for a clean and readable text, suitable for body text and descriptions.
- Use minimalistic icons to represent various functions and data points.
- Clean and structured layout with clear sections for different modules and information.
- Subtle animations and transitions for a smooth and engaging user experience.
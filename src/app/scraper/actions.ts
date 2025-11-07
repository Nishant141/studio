
"use server";

import { scrapeLinkedInProfiles } from "@/ai/flows/linkedin-scraper-flow";

// This is the server action for the LinkedIn scraper page.
export async function scrapeProfilesAction(formData: FormData) {
  const urlsInput = formData.get("urls") as string;

  if (!urlsInput) {
    return { error: "Please provide at least one URL." };
  }

  // Basic validation: split URLs by newline and check if they are valid URLs.
  // A simple try-catch block inside the filter is a neat way to do this.
  const urls = urlsInput.split("\n").filter((url) => {
    try {
      new URL(url); // The constructor will throw an error if the URL is invalid.
      return true;
    } catch (error) {
      return false;
    }
  });

  if (urls.length === 0) {
    return { error: "No valid URLs found." };
  }

  try {
    // Call the Genkit flow with the validated URLs.
    const result = await scrapeLinkedInProfiles({ urls });
    return { data: result.profiles };
  } catch (error) {
    // It's good practice to log the real error on the server.
    console.error("Error scraping profiles:", error);
    return { error: "Failed to scrape profiles. Please try again." };
  }
}

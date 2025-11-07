"use server";

import { scrapeLinkedInProfiles } from "@/ai/flows/linkedin-scraper-flow";

export async function scrapeProfilesAction(formData: FormData) {
  const urlsInput = formData.get("urls") as string;

  if (!urlsInput) {
    return { error: "Please provide at least one URL." };
  }

  const urls = urlsInput.split("\n").filter((url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  });

  if (urls.length === 0) {
    return { error: "No valid URLs found." };
  }

  try {
    const result = await scrapeLinkedInProfiles({ urls });
    return { data: result.profiles };
  } catch (error) {
    console.error(error);
    return { error: "Failed to scrape profiles. Please try again." };
  }
}

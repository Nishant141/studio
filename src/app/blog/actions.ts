
"use server";

import { revalidatePath } from "next/cache";
import { generateArticle as generateArticleFlow } from "@/ai/flows/ai-article-generator";
import { addArticle } from "@/lib/articles";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// This action handles the form submission for generating new blog articles.
export async function generateArticlesAction(formData: FormData) {
  // Grab the form data. 'titles' is a textarea, so it could have multiple lines.
  const titlesInput = formData.get("titles") as string;
  const notes = formData.get("notes") as string | undefined;

  if (!titlesInput) {
    return { error: "Please provide at least one title." };
  }

  // Split the titles string into an array, and filter out any empty lines.
  const titles = titlesInput.split("\n").filter((title) => title.trim() !== "");

  try {
    // Loop through each title and generate an article for it.
    for (const title of titles) {
      // Call the Genkit flow to get the article content from the AI.
      const { content } = await generateArticleFlow({ title, notes });
      
      // For now, just grab a random placeholder image.
      // This is a simple way to get some variety without a complex system.
      const randomImage = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

      // Save the new article to our 'database' (the JSON file).
      await addArticle({ 
        title, 
        notes, 
        content,
        imageUrl: randomImage.imageUrl,
        imageHint: randomImage.imageHint,
       });
    }

    // After adding new articles, we need to tell Next.js to regenerate the blog page
    // so the new articles show up.
    revalidatePath("/blog");
    return { success: `${titles.length} article(s) generated successfully.` };
  } catch (error) {
    console.error(error); // Log the actual error to the server console for debugging.
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: `Failed to generate articles: ${errorMessage}` };
  }
}

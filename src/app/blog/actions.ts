
"use server";

import { revalidatePath } from "next/cache";
import { generateArticle as generateArticleFlow } from "@/ai/flows/ai-article-generator";
import { addArticle } from "@/lib/articles";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export async function generateArticlesAction(formData: FormData) {
  const titlesInput = formData.get("titles") as string;
  const notes = formData.get("notes") as string | undefined;

  if (!titlesInput) {
    return { error: "Please provide at least one title." };
  }

  const titles = titlesInput.split("\n").filter((title) => title.trim() !== "");

  try {
    for (const title of titles) {
      const { content } = await generateArticleFlow({ title, notes });
      
      const randomImage = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

      await addArticle({ 
        title, 
        notes, 
        content,
        imageUrl: randomImage.imageUrl,
        imageHint: randomImage.imageHint,
       });
    }

    revalidatePath("/blog");
    return { success: `${titles.length} article(s) generated successfully.` };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: `Failed to generate articles: ${errorMessage}` };
  }
}

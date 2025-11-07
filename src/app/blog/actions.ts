
"use server";

import { revalidatePath } from "next/cache";
import { generateArticle as generateArticleFlow } from "@/ai/flows/ai-article-generator";
import { generateImage as generateImageFlow } from "@/ai/flows/generate-image-flow";
import { addArticle } from "@/lib/articles";

export async function generateArticlesAction(formData: FormData) {
  const titlesInput = formData.get("titles") as string;
  const notes = formData.get("notes") as string | undefined;

  if (!titlesInput) {
    return { error: "Please provide at least one title." };
  }

  const titles = titlesInput.split("\n").filter((title) => title.trim() !== "");

  try {
    for (const title of titles) {
      // Generate article and image in parallel to save time
      const [articleResult, imageResult] = await Promise.all([
        generateArticleFlow({ title, notes }),
        generateImageFlow({ prompt: title }),
      ]);
      
      const { content } = articleResult;
      const { imageUrl, imageHint } = imageResult;

      await addArticle({ 
        title, 
        notes, 
        content,
        imageUrl,
        imageHint,
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

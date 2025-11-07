
import fs from 'fs/promises';
import path from 'path';

// Define the shape of an article object. Using a TypeScript interface is great for this.
export interface Article {
  id: string;
  slug: string;
  title: string;
  notes?: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  imageHint: string;
}

// We're using a simple JSON file as a database.
// process.cwd() gives us the root of the project.
const articlesPath = path.join(process.cwd(), 'src/lib/articles.json');

/**
 * Reads all articles from the JSON file.
 * @returns {Promise<Article[]>} A promise that resolves to an array of articles.
 */
export async function getArticles(): Promise<Article[]> {
  try {
    const data = await fs.readFile(articlesPath, 'utf-8');
    const articles = JSON.parse(data) as Article[];
    // Always sort by most recent first. It's a common requirement for blogs.
    return articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    // If the file doesn't exist, it's not a critical error, just return an empty array.
    // This can happen on the first run.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    // For any other errors, we should probably throw them.
    throw error;
  }
}

/**
 * Finds a single article by its unique slug.
 * @param {string} slug The slug of the article to find.
 * @returns {Promise<Article | undefined>} The found article or undefined.
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}


/**
 * Adds a new article to our JSON file.
 * @param {Omit<Article, 'id' | 'slug' | 'createdAt'>} articleData The data for the new article.
 * @returns {Promise<Article>} The newly created article with its generated fields.
 */
export async function addArticle(articleData: Omit<Article, 'id' | 'slug' | 'createdAt'>): Promise<Article> {
  const articles = await getArticles();
  
  // Create a URL-friendly slug from the title.
  const slug = articleData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const newArticle: Article = {
    ...articleData,
    id: new Date().toISOString(),
    // Appending a timestamp to the slug is a simple way to guarantee it's unique.
    slug: `${slug}-${new Date().getTime()}`,
    createdAt: new Date().toISOString(),
  };

  // Prepend the new article to the array so it's at the top of the list.
  const updatedArticles = [newArticle, ...articles];
  
  // Write the updated array back to the file.
  // Using null, 2 for JSON.stringify makes the JSON file readable.
  await fs.writeFile(articlesPath, JSON.stringify(updatedArticles, null, 2));
  
  return newArticle;
}

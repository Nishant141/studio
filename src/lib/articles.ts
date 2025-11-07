import fs from 'fs/promises';
import path from 'path';

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

const articlesPath = path.join(process.cwd(), 'src/lib/articles.json');

export async function getArticles(): Promise<Article[]> {
  try {
    const data = await fs.readFile(articlesPath, 'utf-8');
    const articles = JSON.parse(data) as Article[];
    return articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}

export async function addArticle(article: Omit<Article, 'id' | 'slug' | 'createdAt'>): Promise<Article> {
  const articles = await getArticles();
  const slug = article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const newArticle: Article = {
    ...article,
    id: new Date().toISOString(),
    slug: `${slug}-${new Date().getTime()}`, // Ensure unique slug
    createdAt: new Date().toISOString(),
  };
  const updatedArticles = [newArticle, ...articles];
  await fs.writeFile(articlesPath, JSON.stringify(updatedArticles, null, 2));
  return newArticle;
}

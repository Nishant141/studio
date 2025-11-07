import { getArticleBySlug, getArticles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-full">
      {content.split('\n').map((paragraph, index) => {
        if (paragraph.trim() === '') return <br key={index} />;
        if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="font-headline text-xl font-semibold mt-6 mb-2">{paragraph.substring(4)}</h3>
        }
        if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="font-headline text-2xl font-bold mt-8 mb-4 border-b pb-2">{paragraph.substring(3)}</h2>
        }
        if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="font-headline text-3xl font-bold mt-10 mb-6 border-b pb-4">{paragraph.substring(2)}</h1>
        }
        return <p key={index} className="leading-relaxed mb-4">{paragraph}</p>;
      })}
    </div>
  );
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
        <div className="mb-8">
            <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all articles
            </Link>
        </div>
      <header className="mb-8">
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            fill 
            className="object-cover"
            priority
            data-ai-hint={article.imageHint}
          />
        </div>
        <Badge variant="secondary" className="mb-2">AI Generated</Badge>
        <h1 className="font-headline text-4xl md:text-5xl font-bold leading-tight mb-4">
          {article.title}
        </h1>
        <p className="text-muted-foreground">
          Published on {format(new Date(article.createdAt), 'MMMM d, yyyy')}
        </p>
      </header>

      <div className="text-lg">
        <MarkdownRenderer content={article.content} />
      </div>
    </article>
  );
}

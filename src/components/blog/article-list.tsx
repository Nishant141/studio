import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/articles';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export async function ArticleList() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-semibold">No Articles Yet</h3>
        <p className="text-muted-foreground mt-2">Use the generator to create your first article!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article.id} className="flex flex-col">
          <CardHeader>
            <div className="aspect-[16/9] relative mb-4">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint={article.imageHint}
                />
            </div>
            <CardTitle className="font-headline text-xl leading-tight">{article.title}</CardTitle>
            <CardDescription>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">{article.content}</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/blog/${article.slug}`}>
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

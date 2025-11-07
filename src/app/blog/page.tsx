import { Suspense } from 'react';
import { ArticleGenerator } from '@/components/blog/article-generator';
import { ArticleList } from '@/components/blog/article-list';
import { Skeleton } from '@/components/ui/skeleton';

function ArticleListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-16 w-full" />
                </div>
            ))}
        </div>
    )
}

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">AI Blog</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Generate and manage your AI-powered content.
        </p>
      </div>

      <ArticleGenerator />

      <div className="space-y-4">
        <h2 className="font-headline text-3xl font-bold">Published Articles</h2>
        <Suspense fallback={<ArticleListSkeleton />}>
            <ArticleList />
        </Suspense>
      </div>
    </div>
  );
}

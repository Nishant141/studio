"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { generateArticlesAction } from "@/app/blog/actions";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="mr-2 h-4 w-4" />
      )}
      Generate Articles
    </Button>
  );
}

export function ArticleGenerator() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleAction = async (formData: FormData) => {
    const result = await generateArticlesAction(formData);

    if (result?.success) {
      toast({
        title: "Success!",
        description: result.success,
      });
      formRef.current?.reset();
    }
    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  };

  return (
    <Card>
      <form action={handleAction} ref={formRef}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">AI Article Generator</CardTitle>
          <CardDescription>
            Enter one article title per line. Optionally add notes to guide the AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titles">Article Titles</Label>
            <Textarea
              id="titles"
              name="titles"
              placeholder="e.g., Getting Started with React Hooks"
              rows={5}
              required
              className="text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Optional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="e.g., Include code examples for useState and useEffect. Keep it beginner-friendly."
              rows={3}
              className="text-sm"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}

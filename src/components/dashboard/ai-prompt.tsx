"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleAIPrompt } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" aria-label="Submit prompt" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <ArrowRight />}
    </Button>
  );
}

export function AIPrompt() {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const formAction = async (formData: FormData) => {
    const result = await handleAIPrompt(formData);
    if (result?.message) {
      toast({
        title: "AI Action",
        description: result.message,
      });
      setInputValue("");
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
      <CardHeader>
        <CardTitle className="font-headline text-2xl">AI Co-pilot</CardTitle>
        <CardDescription>
          What would you like to do? Try: &quot;call 1-800-555-1234&quot;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex gap-2">
          <Input
            name="prompt"
            placeholder="Type your command..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-base"
          />
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

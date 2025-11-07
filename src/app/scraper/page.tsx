"use client";

import { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Loader2, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { scrapeProfilesAction } from "./actions";

interface ScrapedProfile {
  name: string;
  title: string;
  location: string;
  url: string;
  summary: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Bot className="mr-2 h-4 w-4" />
      )}
      Scrape Profiles
    </Button>
  );
}

function convertToCSV(data: ScrapedProfile[]) {
  const header = ["name", "title", "location", "url", "summary"];
  const rows = data.map((profile) =>
    header
      .map((fieldName) => JSON.stringify(profile[fieldName as keyof ScrapedProfile], (_, value) => value ?? ""))
      .join(",")
  );
  return [header.join(","), ...rows].join("\n");
}

function downloadCSV(csvString: string, filename: string) {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export default function ScraperPage() {
  const [scrapedData, setScrapedData] = useState<ScrapedProfile[]>([]);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const result = await scrapeProfilesAction(formData);
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.data) {
      setScrapedData(result.data);
      toast({
        title: "Success",
        description: `Successfully scraped ${result.data.length} profiles.`,
      });
    }
  };

  const handleDownload = () => {
    if (scrapedData.length === 0) {
      toast({
        variant: "destructive",
        title: "No data to download",
        description: "Scrape some profiles first.",
      });
      return;
    }
    const csv = convertToCSV(scrapedData);
    downloadCSV(csv, "scraped_profiles.csv");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">LinkedIn Scraper</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Extract profile data from a list of LinkedIn URLs.
        </p>
      </div>

      <Card>
        <form action={handleAction} ref={formRef}>
          <CardHeader>
            <CardTitle>Enter Profile URLs</CardTitle>
            <CardDescription>
              Paste one LinkedIn profile URL per line.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              name="urls"
              placeholder="https://www.linkedin.com/in/profile-1&#10;https://www.linkedin.com/in/profile-2&#10;..."
              rows={10}
              className="text-sm"
              required
            />
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scraped Data</CardTitle>
          <CardDescription>
            Results from the scraping process will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Profile URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scrapedData.length > 0 ? (
                scrapedData.map((profile, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{profile.name}</TableCell>
                    <TableCell>{profile.title}</TableCell>
                    <TableCell>{profile.location}</TableCell>
                    <TableCell>{profile.summary}</TableCell>
                    <TableCell>
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Profile
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No data yet. Enter URLs and click &quot;Scrape Profiles&quot;.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={handleDownload} disabled={scrapedData.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

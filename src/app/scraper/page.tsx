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
import { Download } from "lucide-react";

const mockScrapedData = [
  {
    name: "John Doe",
    title: "Senior Software Engineer at Google",
    location: "Mountain View, CA",
    url: "linkedin.com/in/johndoe-mock",
  },
];

export default function ScraperPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">LinkedIn Scraper</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Extract profile data from a list of LinkedIn URLs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enter Profile URLs</CardTitle>
          <CardDescription>
            Paste one LinkedIn profile URL per line.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="linkedin.com/in/profile-1&#10;linkedin.com/in/profile-2&#10;..."
            rows={10}
            className="text-sm"
          />
        </CardContent>
        <CardFooter>
          <Button>Scrape Profiles</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scraped Data</CardTitle>
          <CardDescription>
            Results from the scraping process will appear here. This is mock data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Profile URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockScrapedData.map((profile, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.title}</TableCell>
                  <TableCell>{profile.location}</TableCell>
                  <TableCell>
                    <a
                      href={`https://${profile.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {profile.url}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

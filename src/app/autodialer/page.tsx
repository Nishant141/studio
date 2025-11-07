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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockCallLogs = [
  { number: "1-800-555-1234", status: "Answered", duration: "1m 25s", time: "2m ago" },
  { number: "1-888-123-4567", status: "Failed", duration: "0s", time: "5m ago" },
  { number: "1-877-987-6543", status: "Voicemail", duration: "35s", time: "10m ago" },
];

export default function AutodialerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl font-bold">Autodialer</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Automatically dial a list of phone numbers.
        </p>
      </div>

      <Card>
        <Tabs defaultValue="manual">
          <CardHeader>
            <CardTitle>Phone Numbers</CardTitle>
            <div className="flex justify-between items-end">
              <CardDescription>
                Provide a list of numbers to start dialing.
              </CardDescription>
              <TabsList>
                <TabsTrigger value="manual">Paste Numbers</TabsTrigger>
                <TabsTrigger value="upload">Upload CSV</TabsTrigger>
              </TabsList>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="manual">
              <Textarea
                placeholder="1-800-555-1234&#10;1-888-123-4567&#10;..."
                rows={10}
                className="text-sm"
              />
            </TabsContent>
            <TabsContent value="upload">
                <Input type="file" accept=".csv" />
            </TabsContent>
          </CardContent>
          <CardFooter>
            <Button>Start Dialing</Button>
          </CardFooter>
        </Tabs>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call Logs</CardTitle>
          <CardDescription>
            Live status of your dialing session. This is mock data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCallLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{log.number}</TableCell>
                  <TableCell>
                    <Badge variant={
                        log.status === "Answered" ? "default" :
                        log.status === "Failed" ? "destructive" : "secondary"
                    }>
                        {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell>{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2, PhoneCall } from "lucide-react";

interface CallLog {
  number: string;
  status: "Pending" | "Dialing" | "Answered" | "Voicemail" | "Failed";
  duration: string;
  time: string;
}

const AutodialerPage = () => {
  const [numbers, setNumbers] = useState<string>("");
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [isDialing, setIsDialing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseNumbers = (input: string): string[] => {
    return input.split(/[\n,]+/).map(n => n.trim()).filter(n => n);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setNumbers(text);
        toast({ title: "CSV Loaded", description: "Numbers extracted from the file." });
      };
      reader.readAsText(file);
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startDialing = async () => {
    const numbersToDial = parseNumbers(numbers);
    if (numbersToDial.length === 0) {
      toast({
        variant: "destructive",
        title: "No numbers to dial",
        description: "Please enter some phone numbers.",
      });
      return;
    }

    setIsDialing(true);
    const initialLogs: CallLog[] = numbersToDial.map(number => ({
      number,
      status: "Pending",
      duration: "0s",
      time: "Queued",
    }));
    setCallLogs(initialLogs);

    for (let i = 0; i < initialLogs.length; i++) {
      // Set status to Dialing
      setCallLogs(prev => prev.map((log, index) => index === i ? { ...log, status: "Dialing", time: "Now" } : log));
      await sleep(1000); // Simulate dialing time

      // Simulate call outcome
      const randomOutcome = Math.random();
      let status: CallLog["status"] = "Failed";
      let duration = 0;

      if (randomOutcome < 0.6) {
        status = "Answered";
        duration = 10 + Math.floor(Math.random() * 110); // 10s to 2min
      } else if (randomOutcome < 0.85) {
        status = "Voicemail";
        duration = 5 + Math.floor(Math.random() * 25); // 5s to 30s
      } else {
        status = "Failed";
      }

      setCallLogs(prev => prev.map((log, index) => index === i ? { 
          ...log, 
          status, 
          duration: `${duration}s`,
          time: new Date().toLocaleTimeString()
        } : log
      ));

      await sleep(500); // Pause between calls
    }

    setIsDialing(false);
    toast({ title: "Dialing Complete", description: "Finished calling all numbers." });
  };

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
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                disabled={isDialing}
              />
            </TabsContent>
            <TabsContent value="upload">
                <Input 
                  type="file" 
                  accept=".csv, .txt" 
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={isDialing}
                />
            </TabsContent>
          </CardContent>
          <CardFooter>
            <Button onClick={startDialing} disabled={isDialing}>
              {isDialing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PhoneCall className="mr-2 h-4 w-4" />
              )}
              {isDialing ? "Dialing..." : "Start Dialing"}
            </Button>
          </CardFooter>
        </Tabs>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call Logs</CardTitle>
          <CardDescription>
            Live status of your dialing session.
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
              {callLogs.length > 0 ? callLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{log.number}</TableCell>
                  <TableCell>
                    <Badge variant={
                        log.status === "Answered" ? "default" :
                        log.status === "Failed" ? "destructive" :
                        log.status === "Dialing" ? "outline" : "secondary"
                    }>
                        {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.duration}</TableCell>
                  <TableCell>{log.time}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No calls made yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AutodialerPage;

    
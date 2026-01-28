'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ActivityAnalyzer } from './activity-analyzer';
import type { Lead } from '@/lib/types';

export function ActivityAnalyzerButton({ lead }: { lead: Lead }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Analyze Activity
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Activity Analysis for {lead.company}</DialogTitle>
          <DialogDescription>
            AI-powered analysis of lead activities to identify suspicious behavior and suggest actions.
          </DialogDescription>
        </DialogHeader>
        <ActivityAnalyzer lead={lead} />
      </DialogContent>
    </Dialog>
  );
}

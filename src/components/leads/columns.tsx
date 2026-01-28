'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Lead, LeadStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ActivityAnalyzerButton } from './activity-analyzer-button';
import { format, addMinutes } from 'date-fns';

const statusColors: Record<LeadStatus, string> = {
    New: 'bg-blue-100 text-blue-800 border-blue-200',
    Contacted: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    Qualified: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Proposal: 'bg-purple-100 text-purple-800 border-purple-200',
    Won: 'bg-green-100 text-green-800 border-green-200',
    Lost: 'bg-red-100 text-red-800 border-red-200',
};


export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'contact',
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const lead = row.original;
        return (
            <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={lead.avatarUrl} alt={lead.contact} data-ai-hint="avatar" />
                    <AvatarFallback>{lead.contact.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{lead.contact}</span>
                    <span className="text-sm text-muted-foreground">{lead.email}</span>
                </div>
            </div>
        )
    }
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'industry',
    header: 'Industry',
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'region',
    header: 'Region',
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
        const status = row.getValue('status') as LeadStatus;
        return <Badge variant="outline" className={cn("capitalize", statusColors[status])}>{status}</Badge>
    },
    filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date Added
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        const utcDate = addMinutes(date, date.getTimezoneOffset());
        return <div>{format(utcDate, 'MM/dd/yyyy')}</div>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const lead = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ActivityAnalyzerButton lead={lead} />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

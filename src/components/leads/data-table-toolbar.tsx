'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters: {
    industries: string[];
    regions: string[];
    statuses: string[];
  };
}

export function DataTableToolbar<TData>({
  table,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  
  const statusColumn = table.getColumn('status');
  const industryColumn = table.getColumn('industry');
  const regionColumn = table.getColumn('region');

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search leads..."
          value={(table.getColumn('contact')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('contact')?.setFilterValue(event.target.value)
          }
          className="h-9 max-w-sm"
        />
      </div>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-normal">Status</DropdownMenuLabel>
             {filters.statuses.map(status => (
                <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusColumn?.getFilterValue() === status}
                    onCheckedChange={(value) => {
                        if (value) statusColumn?.setFilterValue(status);
                        else statusColumn?.setFilterValue(undefined);
                    }}
                >
                    {status}
                </DropdownMenuCheckboxItem>
             ))}
             <DropdownMenuSeparator />
             <DropdownMenuLabel className="text-xs font-normal">Industry</DropdownMenuLabel>
              {filters.industries.map(industry => (
                <DropdownMenuCheckboxItem
                    key={industry}
                    checked={industryColumn?.getFilterValue() === industry}
                    onCheckedChange={(value) => {
                        if (value) industryColumn?.setFilterValue(industry);
                        else industryColumn?.setFilterValue(undefined);
                    }}
                >
                    {industry}
                </DropdownMenuCheckboxItem>
             ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

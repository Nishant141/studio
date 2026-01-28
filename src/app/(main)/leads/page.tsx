import { DataTable } from '@/components/leads/data-table';
import { columns } from '@/components/leads/columns';
import { getLeads, industries, regions } from '@/lib/api';
import { leadStatuses } from '@/lib/types';

export default async function LeadsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : undefined;
  const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;
  const industry = typeof searchParams.industry === 'string' ? searchParams.industry : undefined;
  const region = typeof searchParams.region === 'string' ? searchParams.region : undefined;

  const leads = await getLeads({ query, status, industry, region });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Leads</h1>
        {/* Add button can be placed here */}
      </div>
      <DataTable 
        columns={columns} 
        data={leads}
        filters={{
          industries,
          regions,
          statuses: leadStatuses
        }}
      />
    </div>
  );
}

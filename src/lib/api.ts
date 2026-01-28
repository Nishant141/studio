import { leads as allLeads, activities as allActivities, users } from './seed-data';
import type { Lead, Activity, User, LeadStatus } from './types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getAuthenticatedUser(): Promise<User> {
  await delay(100);
  return users[0];
}

export async function getLeads({
  query,
  status,
  industry,
  region,
}: {
  query?: string;
  status?: string;
  industry?: string;
  region?: string;
} = {}): Promise<Lead[]> {
  await delay(300);
  let filteredLeads = allLeads;

  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filteredLeads = filteredLeads.filter(
      lead =>
        lead.company.toLowerCase().includes(lowerCaseQuery) ||
        lead.contact.toLowerCase().includes(lowerCaseQuery) ||
        lead.email.toLowerCase().includes(lowerCaseQuery)
    );
  }

  if (status) {
    filteredLeads = filteredLeads.filter(lead => lead.status === status);
  }

  if (industry) {
    filteredLeads = filteredLeads.filter(lead => lead.industry === industry);
  }

  if (region) {
    filteredLeads = filteredLeads.filter(lead => lead.region === region);
  }

  return filteredLeads;
}

export async function getLead(id: string): Promise<Lead | undefined> {
  await delay(200);
  return allLeads.find(lead => lead.id === id);
}

export async function getActivitiesForLead(leadId: string): Promise<Activity[]> {
  await delay(200);
  return allActivities.filter(activity => activity.leadId === leadId).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function getAnalyticsSummary() {
  await delay(500);
  const totalLeads = allLeads.length;
  const wonLeads = allLeads.filter(l => l.status === 'Won').length;
  const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
  const newLeadsThisMonth = allLeads.filter(l => {
    const leadDate = new Date(l.createdAt);
    const now = new Date();
    return leadDate.getMonth() === now.getMonth() && leadDate.getFullYear() === now.getFullYear();
  }).length;

  return {
    totalLeads: { value: totalLeads, change: 12.5 },
    conversionRate: { value: conversionRate, change: 2.1 },
    newLeads: { value: newLeadsThisMonth, change: -5.2 },
    wonDeals: { value: wonLeads, change: 8.3 },
  };
}

export async function getLeadsBySource() {
  await delay(400);
  const sourceCounts: { [key: string]: number } = {};
  for (const lead of allLeads) {
    sourceCounts[lead.source] = (sourceCounts[lead.source] || 0) + 1;
  }
  return Object.entries(sourceCounts).map(([source, count]) => ({
    name: source,
    value: count,
  }));
}

export async function getDailyTrends() {
  await delay(600);
  const trendData: { [key: string]: { new: number; won: number } } = {};
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    trendData[dateString] = { new: 0, won: 0 };
  }

  for (const lead of allLeads) {
    const leadDate = new Date(lead.createdAt);
    const dateString = leadDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (trendData[dateString]) {
      trendData[dateString].new++;
      if (lead.status === 'Won') {
        trendData[dateString].won++;
      }
    }
  }

  return Object.entries(trendData).map(([date, values]) => ({
    date,
    ...values,
  }));
}

export const industries = [...new Set(allLeads.map(lead => lead.industry))];
export const regions = [...new Set(allLeads.map(lead => lead.region))];

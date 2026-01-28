import type { User, Lead, Activity, LeadStatus } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    role: 'Admin',
    email: 'admin@leadstream.com',
    name: 'Alex Johnson',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100'
  },
];

const industries = ["Technology", "Healthcare", "Finance", "Retail", "Manufacturing"];
const regions = ["North America", "Europe", "Asia", "South America", "Australia"];
const sources = ["Website", "Referral", "Cold Call", "Advertisement", "Event"];
const statuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

const generateLeads = (count: number): Lead[] => {
  const leads: Lead[] = [];
  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(new Date().getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
    leads.push({
      id: `lead-${i}`,
      company: `Innovate Corp ${i}`,
      contact: `Person ${i}`,
      email: `contact${i}@innovate.com`,
      industry: industries[i % industries.length],
      region: regions[i % regions.length],
      status: statuses[i % statuses.length],
      source: sources[i % sources.length],
      createdAt: createdAt,
      avatarUrl: `https://picsum.photos/seed/lead${i}/100/100`,
    });
  }
  return leads;
};

export const leads: Lead[] = generateLeads(218);

const activityActions = ["Viewed pricing page", "Downloaded whitepaper", "Scheduled a demo", "Initial call", "Sent proposal", "Follow-up email sent", "Signed contract"];

const generateActivities = (leads: Lead[]): Activity[] => {
    const activities: Activity[] = [];
    let activityId = 1;
    for (const lead of leads) {
        const numActivities = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < numActivities; i++) {
            const leadCreationDate = new Date(lead.createdAt).getTime();
            const now = new Date().getTime();
            const timestamp = new Date(leadCreationDate + Math.random() * (now - leadCreationDate)).toISOString();
            activities.push({
                id: `activity-${activityId++}`,
                leadId: lead.id,
                action: activityActions[Math.floor(Math.random() * activityActions.length)],
                timestamp: timestamp,
            });
        }
    }
    return activities;
};

export const activities: Activity[] = generateActivities(leads);

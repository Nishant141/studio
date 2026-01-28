export type User = {
  id: string;
  role: 'Admin' | 'Viewer';
  email: string;
  name: string;
  avatarUrl: string;
};

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';

export const leadStatuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'];

export type Lead = {
  id: string;
  company: string;
  contact: string;
  email: string;
  industry: string;
  region: string;
  status: LeadStatus;
  source: string;
  createdAt: string; // ISO string
  avatarUrl: string;
};

export type Activity = {
  id: string;
  leadId: string;
  action: string;
  timestamp: string; // ISO string
};

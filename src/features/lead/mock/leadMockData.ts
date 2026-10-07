import type { LeadFormData } from '../types/lead.types';

export const emptyLeadFormValues: LeadFormData = {
  fullName: '',
  email: '',
  leadType: '',
  companyName: '',
  phone: '',
  notes: '',
  consent: false,
};

export const sampleIndividualLead: LeadFormData = {
  fullName: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  leadType: 'Individual',
  companyName: '',
  phone: '9876543210',
  notes: 'Looking for a product consultation and pricing details.',
  consent: true,
};

export const sampleCompanyLead: LeadFormData = {
  fullName: 'Jordan Chen',
  email: 'jordan.chen@acmeglobal.com',
  leadType: 'Company',
  companyName: 'Acme Global Technologies',
  phone: '8005551234',
  notes: 'Evaluating dynamic forms for a multi-regional enterprise deployment.',
  consent: true,
};

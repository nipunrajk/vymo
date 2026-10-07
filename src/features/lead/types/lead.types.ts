export type LeadClassification = 'Individual' | 'Company';

export interface LeadFormData {
  fullName: string;
  email: string;
  leadType: LeadClassification | '';
  companyName?: string;
  phone: string;
  notes?: string;
  consent: boolean;
}

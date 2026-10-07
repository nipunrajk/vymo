import type { FormValues } from '../../../design-system/form/types';

export type LeadClassification = 'Individual' | 'Company';

export interface LeadFormData extends FormValues {
  fullName: string;
  email: string;
  leadType: LeadClassification | '';
  companyName?: string;
  phone: string;
  notes?: string;
  consent: boolean;
}

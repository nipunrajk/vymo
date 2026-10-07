import type { FieldConfig } from '../../../design-system/form/types';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\d{10}$/;

export const leadFormConfig: FieldConfig[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full name',
    placeholder: 'e.g. Jane Doe',
    autoComplete: 'name',
    colSpan: 1,
    validations: {
      required: true,
      requiredMessage: 'Full name is required',
    },
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'e.g. jane@company.com',
    autoComplete: 'email',
    colSpan: 1,
    validations: {
      required: true,
      requiredMessage: 'Email address is required',
      pattern: {
        regex: EMAIL_REGEX,
        message: 'Please enter a valid email address (e.g. name@domain.com)',
      },
    },
  },
  {
    name: 'leadType',
    type: 'select',
    label: 'Lead type',
    placeholder: 'Select lead type...',
    colSpan: 1,
    options: [
      { label: 'Individual', value: 'Individual' },
      { label: 'Company', value: 'Company' },
    ],
    validations: {
      required: true,
      requiredMessage: 'Please select a lead type',
    },
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company name',
    placeholder: 'e.g. Acme Corporation',
    autoComplete: 'organization',
    colSpan: 1,
    // Conditionally visible only when Lead type is 'Company'
    condition: (values) => values.leadType === 'Company',
    validations: {
      required: true,
      requiredMessage: 'Company name is required for company leads',
    },
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone',
    placeholder: '10 digits (e.g. 9876543210)',
    autoComplete: 'tel',
    hint: 'Must be exactly 10 digits',
    colSpan: 1,
    validations: {
      required: true,
      requiredMessage: 'Phone number is required',
      pattern: {
        regex: PHONE_REGEX,
        message: 'Phone number must be exactly 10 digits (numbers only)',
      },
    },
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'Notes',
    placeholder: 'Enter any additional details or requirements...',
    hint: 'Optional (max 200 characters)',
    colSpan: 2,
    validations: {
      required: false,
      maxLength: {
        value: 200,
        message: 'Notes cannot exceed 200 characters',
      },
    },
  },
  {
    name: 'consent',
    type: 'checkbox',
    label: 'I consent to being contacted regarding this inquiry',
    colSpan: 2,
    validations: {
      required: true,
      requiredMessage: 'Consent is required to submit this form',
    },
  },
];

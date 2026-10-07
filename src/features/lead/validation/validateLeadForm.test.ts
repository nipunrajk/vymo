import { describe, it, expect } from 'vitest';
import { leadFormConfig } from '../config/leadFormConfig';
import { validateLeadForm, validateSingleField } from './validateLeadForm';

describe('validateLeadForm pure engine', () => {
  it('returns errors for all required fields when form is empty', () => {
    const emptyValues = {
      fullName: '',
      email: '',
      leadType: '',
      companyName: '',
      phone: '',
      notes: '',
      consent: false,
    };

    const errors = validateLeadForm(leadFormConfig, emptyValues);

    expect(errors.fullName).toBe('Full name is required');
    expect(errors.email).toBe('Email address is required');
    expect(errors.leadType).toBe('Please select a lead type');
    expect(errors.phone).toBe('Phone number is required');
    expect(errors.consent).toBe('Consent is required to submit this form');
    // companyName is NOT required when leadType is empty (not 'Company')
    expect(errors.companyName).toBeUndefined();
    // notes is optional
    expect(errors.notes).toBeUndefined();
  });

  it('does NOT require companyName when leadType is "Individual"', () => {
    const values = {
      fullName: 'Alice Smith',
      email: 'alice@example.com',
      leadType: 'Individual',
      companyName: '',
      phone: '9876543210',
      notes: 'Interested in product',
      consent: true,
    };

    const errors = validateLeadForm(leadFormConfig, values);
    expect(errors.companyName).toBeUndefined();
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('requires companyName when leadType is "Company"', () => {
    const values = {
      fullName: 'Bob Johnson',
      email: 'bob@acme.com',
      leadType: 'Company',
      companyName: '',
      phone: '9876543210',
      consent: true,
    };

    const errors = validateLeadForm(leadFormConfig, values);
    expect(errors.companyName).toBe('Company name is required for company leads');
  });

  it('validates email format properly', () => {
    const emailField = leadFormConfig.find((f) => f.name === 'email')!;

    expect(validateSingleField(emailField, { email: 'invalid-email' })).toContain(
      'Please enter a valid email address'
    );
    expect(validateSingleField(emailField, { email: 'bob@' })).toContain(
      'Please enter a valid email address'
    );
    expect(validateSingleField(emailField, { email: 'bob@company.com' })).toBeNull();
  });

  it('validates phone number must be exactly 10 digits', () => {
    const phoneField = leadFormConfig.find((f) => f.name === 'phone')!;

    expect(validateSingleField(phoneField, { phone: '12345' })).toContain(
      'Phone number must be exactly 10 digits'
    );
    expect(validateSingleField(phoneField, { phone: '123456789012' })).toContain(
      'Phone number must be exactly 10 digits'
    );
    expect(validateSingleField(phoneField, { phone: '12345abcde' })).toContain(
      'Phone number must be exactly 10 digits'
    );
    expect(validateSingleField(phoneField, { phone: '9876543210' })).toBeNull();
  });

  it('validates notes max length (200 characters)', () => {
    const notesField = leadFormConfig.find((f) => f.name === 'notes')!;

    const longNotes = 'A'.repeat(201);
    expect(validateSingleField(notesField, { notes: longNotes })).toBe(
      'Notes cannot exceed 200 characters'
    );

    const validNotes = 'A'.repeat(200);
    expect(validateSingleField(notesField, { notes: validNotes })).toBeNull();
  });

  it('validates consent checkbox must be true', () => {
    const consentField = leadFormConfig.find((f) => f.name === 'consent')!;

    expect(validateSingleField(consentField, { consent: false })).toBe(
      'Consent is required to submit this form'
    );
    expect(validateSingleField(consentField, { consent: true })).toBeNull();
  });

  it('passes cleanly with zero errors when all required fields are valid', () => {
    const validCompanyLead = {
      fullName: 'Sarah Connor',
      email: 'sarah@skynet.com',
      leadType: 'Company',
      companyName: 'Cyberdyne Systems',
      phone: '8005551234',
      notes: 'Urgent meeting requested',
      consent: true,
    };

    const errors = validateLeadForm(leadFormConfig, validCompanyLead);
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

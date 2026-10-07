import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LeadCapturePage } from './LeadCapturePage';

describe('LeadCapturePage Component Integration Tests', () => {
  it('renders initial form fields from config (excluding conditionally hidden Company Name)', () => {
    render(<LeadCapturePage />);

    expect(screen.getByRole('heading', { name: /enterprise lead capture/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lead type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i consent to being contacted/i)).toBeInTheDocument();

    // Company Name must NOT be rendered initially
    expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument();
  });

  it('validates on blur and displays field error under the field', () => {
    render(<LeadCapturePage />);

    const fullNameInput = screen.getByLabelText(/full name/i);
    fireEvent.focus(fullNameInput);
    fireEvent.blur(fullNameInput);

    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(fullNameInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('displays pattern format error on phone when invalid value entered', () => {
    render(<LeadCapturePage />);

    const phoneInput = screen.getByLabelText(/phone/i);
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.blur(phoneInput);

    expect(screen.getByText('Phone number must be exactly 10 digits (numbers only)')).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('dynamically displays Company Name when Lead type is changed to Company without page reload', () => {
    render(<LeadCapturePage />);

    const leadTypeSelect = screen.getByLabelText(/lead type/i);
    expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument();

    // Select 'Company'
    fireEvent.change(leadTypeSelect, { target: { value: 'Company' } });

    // Company Name must appear dynamically
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();

    // Switch back to 'Individual'
    fireEvent.change(leadTypeSelect, { target: { value: 'Individual' } });

    // Company Name must disappear
    expect(screen.queryByLabelText(/company name/i)).not.toBeInTheDocument();
  });

  it('blocks submit while form is invalid, showing every current error', () => {
    render(<LeadCapturePage />);

    const submitBtn = screen.getByRole('button', { name: /submit lead/i });
    fireEvent.click(submitBtn);

    // Verify all required field errors are displayed
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    expect(screen.getByText('Please select a lead type')).toBeInTheDocument();
    expect(screen.getByText('Phone number is required')).toBeInTheDocument();
    expect(screen.getByText('Consent is required to submit this form')).toBeInTheDocument();

    // Should still be on the form (not submitted)
    expect(screen.getByRole('button', { name: /submit lead/i })).toBeInTheDocument();
    expect(screen.queryByText(/lead captured successfully/i)).not.toBeInTheDocument();
  });

  it('validates Company Name is required when visible (Company selected)', () => {
    render(<LeadCapturePage />);

    const leadTypeSelect = screen.getByLabelText(/lead type/i);
    fireEvent.change(leadTypeSelect, { target: { value: 'Company' } });

    const submitBtn = screen.getByRole('button', { name: /submit lead/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Company name is required for company leads')).toBeInTheDocument();
  });

  it('submits successfully when form is valid, logging to console and displaying data on page', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<LeadCapturePage />);

    // Click quick preset button for Reviewer test
    const fillCompanyBtn = screen.getByRole('button', { name: /fill sample \(company\)/i });
    fireEvent.click(fillCompanyBtn);

    // Verify Company Name is visible and populated
    const companyInput = screen.getByLabelText(/company name/i) as HTMLInputElement;
    expect(companyInput).toBeInTheDocument();
    expect(companyInput.value).toBe('Acme Global Technologies');

    // Submit the form
    const submitBtn = screen.getByRole('button', { name: /submit lead/i });
    fireEvent.click(submitBtn);

    // Console log called
    expect(consoleSpy).toHaveBeenCalledWith(
      'Lead form submitted successfully:',
      expect.objectContaining({
        fullName: 'Jordan Chen',
        email: 'jordan.chen@acmeglobal.com',
        leadType: 'Company',
        companyName: 'Acme Global Technologies',
        phone: '8005551234',
        consent: true,
      })
    );

    // On-screen confirmation table
    expect(screen.getByText(/lead captured successfully!/i)).toBeInTheDocument();
    expect(screen.getByText('Acme Global Technologies')).toBeInTheDocument();
    expect(screen.getByText('jordan.chen@acmeglobal.com')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('allows capturing another lead and resets the form', () => {
    render(<LeadCapturePage />);

    // Fill and submit
    fireEvent.click(screen.getByRole('button', { name: /fill sample \(individual\)/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit lead/i }));

    expect(screen.getByText(/lead captured successfully!/i)).toBeInTheDocument();

    // Click Reset
    fireEvent.click(screen.getByRole('button', { name: /capture another lead/i }));

    // Back to fresh form
    expect(screen.getByRole('button', { name: /submit lead/i })).toBeInTheDocument();
    expect(screen.queryByText(/lead captured successfully!/i)).not.toBeInTheDocument();
  });
});

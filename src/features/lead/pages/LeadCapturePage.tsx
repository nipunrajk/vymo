import React, { useState } from 'react';
import { DynamicForm } from '../../../design-system/form/DynamicForm';
import { Button } from '../../../design-system/atoms/Button/Button';
import type { FormErrors, FormTouched, FormValues } from '../../../design-system/form/types';
import { leadFormConfig } from '../config/leadFormConfig';
import {
  emptyLeadFormValues,
  sampleCompanyLead,
  sampleIndividualLead,
} from '../mock/leadMockData';
import { validateLeadForm, validateSingleField } from '../validation/validateLeadForm';
import styles from './LeadCapturePage.module.css';

export const LeadCapturePage: React.FC = () => {
  const [values, setValues] = useState<FormValues>(emptyLeadFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  // Field change handler: updates values & re-validates if already touched
  const handleChange = (name: string, value: any) => {
    setValues((prev) => {
      const updated = { ...prev, [name]: value };

      // If switching Lead type away from 'Company', clear companyName value
      if (name === 'leadType' && value !== 'Company') {
        updated.companyName = '';
      }

      return updated;
    });

    // If the field was already touched, perform immediate re-validation
    if (touched[name]) {
      const updatedValues = { ...values, [name]: value };
      if (name === 'leadType' && value !== 'Company') {
        updatedValues.companyName = '';
      }

      const fieldConfig = leadFormConfig.find((f) => f.name === name);
      if (fieldConfig) {
        const error = validateSingleField(fieldConfig, updatedValues);
        setErrors((prev) => {
          const next = { ...prev };
          if (error) {
            next[name] = error;
          } else {
            delete next[name];
          }

          // If leadType changed to Individual, clear any existing companyName error
          if (name === 'leadType' && value !== 'Company') {
            delete next.companyName;
          }
          return next;
        });
      }
    }
  };

  // Field blur handler: marks field as touched and computes error
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldConfig = leadFormConfig.find((f) => f.name === name);
    if (fieldConfig) {
      const error = validateSingleField(fieldConfig, values);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[name] = error;
        } else {
          delete next[name];
        }
        return next;
      });
    }
  };

  // Form submit handler: validates all visible fields, blocks if invalid
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all visible fields as touched so all current errors are displayed
    const allTouched: FormTouched = {};
    leadFormConfig.forEach((field) => {
      if (!field.condition || field.condition(values)) {
        allTouched[field.name] = true;
      }
    });
    setTouched(allTouched);

    // Run pure validation on current values
    const currentErrors = validateLeadForm(leadFormConfig, values);
    setErrors(currentErrors);

    const errorKeys = Object.keys(currentErrors);
    if (errorKeys.length > 0) {
      // Focus first invalid field for accessibility
      const firstInvalidFieldName = errorKeys[0];
      const targetElement = document.getElementById(`field-${firstInvalidFieldName}`);
      if (targetElement) {
        targetElement.focus();
      }
      return;
    }

    // Submission succeeded! Print values to console as requested
    console.log('Lead form submitted successfully:', values);
    setSubmittedData(values);
  };

  // Reset or pre-fill handlers
  const handleReset = () => {
    setValues(emptyLeadFormValues);
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  const handlePreFill = (mock: typeof sampleIndividualLead) => {
    setValues(mock);
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Vymo Brand Header */}
      <nav className={styles.navbar} aria-label="Brand Header">
        <div className={styles.navContainer}>
          <div className={styles.logoGroup}>
            {/* Vymo Official Brand SVG Mark */}
            <svg
              width="100"
              height="28"
              viewBox="0 0 100 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Vymo"
            >
              {/* V mark in signature Vymo purple */}
              <path
                d="M4.5 4L13.5 22L22.5 4H16.8L13.5 13.8L10.2 4H4.5Z"
                fill="var(--color-primary)"
              />
              {/* Y in dark slate */}
              <path
                d="M26 4L31 13.5V22H34.5V13.5L39.5 4H35.8L32.8 10.5L29.7 4H26Z"
                fill="var(--color-text-primary)"
              />
              {/* M in dark slate */}
              <path
                d="M43 4V22H46.5V10.2L50.5 17.5H52L56 10.2V22H59.5V4H56.5L51.3 13.5L46 4H43Z"
                fill="var(--color-text-primary)"
              />
              {/* O in dark slate */}
              <path
                d="M71.5 3.5C65.7 3.5 61 8.2 61 14C61 19.8 65.7 22.5 71.5 22.5C77.3 22.5 82 19.8 82 14C82 8.2 77.3 3.5 71.5 3.5ZM71.5 19C67.6 19 64.5 16.8 64.5 14C64.5 11.2 67.6 7 71.5 7C75.4 7 78.5 11.2 78.5 14C78.5 16.8 75.4 19 71.5 19Z"
                fill="var(--color-text-primary)"
              />
            </svg>
            <span className={styles.brandTag}>Design System</span>
          </div>

          <div className={styles.navLinks}>
            <a
              href="https://vymo.com"
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
            >
              vymo.com ↗
            </a>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>Config-Driven Dynamic Form</span>
          </div>
          <h1 className={styles.title}>Enterprise Lead Capture</h1>
          <p className={styles.subtitle}>
            Built with React 19 and Vymo&apos;s Design System tokens. Streamlining lead qualification and distribution for financial institutions.
          </p>
        </header>

        {/* Quick Testing Toolbar for Reviewers */}
        <div className={styles.devToolbar}>
          <span className={styles.toolbarLabel}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
            Reviewer Quick Actions:
          </span>
          <div className={styles.toolbarActions}>
            <button
              type="button"
              className={styles.mockBtn}
              onClick={() => handlePreFill(sampleIndividualLead)}
            >
              Fill Sample (Individual)
            </button>
            <button
              type="button"
              className={styles.mockBtn}
              onClick={() => handlePreFill(sampleCompanyLead)}
            >
              Fill Sample (Company)
            </button>
            <button
              type="button"
              className={styles.mockBtn}
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </div>

        {/* Form or Submission Results */}
        {submittedData ? (
          <section className={styles.successCard} aria-labelledby="submission-success-title">
            <div className={styles.successHeader}>
              <svg
                className={styles.successIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div>
                <h2 id="submission-success-title" className={styles.successTitle}>
                  Lead Captured Successfully!
                </h2>
                <p className={styles.successDescription}>
                  Values logged to console and rendered below.
                </p>
              </div>
            </div>

            <table className={styles.tablePreview}>
              <tbody>
                <tr>
                  <th>Full Name</th>
                  <td>{submittedData.fullName}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{submittedData.email}</td>
                </tr>
                <tr>
                  <th>Lead Type</th>
                  <td>{submittedData.leadType}</td>
                </tr>
                {submittedData.leadType === 'Company' && (
                  <tr>
                    <th>Company Name</th>
                    <td>{submittedData.companyName}</td>
                  </tr>
                )}
                <tr>
                  <th>Phone</th>
                  <td>{submittedData.phone}</td>
                </tr>
                {submittedData.notes && (
                  <tr>
                    <th>Notes</th>
                    <td>{submittedData.notes}</td>
                  </tr>
                )}
                <tr>
                  <th>Consent</th>
                  <td>{submittedData.consent ? 'Agreed' : 'Not Agreed'}</td>
                </tr>
              </tbody>
            </table>

            <h3 style={{ fontSize: '0.875rem', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>
              Raw JSON Payload:
            </h3>
            <pre className={styles.dataPreview}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>

            <div className={styles.resetAction}>
              <Button variant="primary" onClick={handleReset}>
                Capture Another Lead
              </Button>
            </div>
          </section>
        ) : (
          <div className={styles.card}>
            <DynamicForm
              config={leadFormConfig}
              values={values}
              errors={errors}
              touched={touched}
              submitLabel="Submit Lead"
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </main>
    </div>
  );
};

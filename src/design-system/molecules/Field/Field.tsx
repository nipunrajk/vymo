import React from 'react';
import styles from './Field.module.css';

export interface FieldMoleculeProps {
  id: string;
  label?: React.ReactNode;
  required?: boolean;
  hint?: string;
  error?: string;
  colSpan?: 1 | 2;
  hideLabel?: boolean;
  children: React.ReactNode;
}

export const Field: React.FC<FieldMoleculeProps> = ({
  id,
  label,
  required = false,
  hint,
  error,
  colSpan = 1,
  hideLabel = false,
  children,
}) => {
  return (
    <div className={`${styles.field} ${colSpan === 2 ? styles.span2 : styles.span1}`}>
      {!hideLabel && label && (
        <div className={styles.labelRow}>
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && (
              <span className={styles.requiredIndicator} aria-hidden="true">
                *
              </span>
            )}
          </label>
        </div>
      )}

      <div className={styles.controlSlot}>{children}</div>

      {error ? (
        <div id={`${id}-error`} className={styles.error} role="alert" aria-live="polite">
          <svg
            className={styles.errorIcon}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      ) : hint ? (
        <div id={`${id}-hint`} className={styles.hint}>
          {hint}
        </div>
      ) : null}
    </div>
  );
};

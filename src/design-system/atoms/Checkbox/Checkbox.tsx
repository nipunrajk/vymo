import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  onBlur,
  label,
  disabled = false,
  hasError = false,
  ariaDescribedBy,
}) => {
  return (
    <label
      htmlFor={id}
      className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedBy}
        className={styles.input}
      />
      <span
        aria-hidden="true"
        className={`${styles.customBox} ${hasError ? styles.error : ''}`}
      >
        {checked && (
          <svg className={styles.checkmark} viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

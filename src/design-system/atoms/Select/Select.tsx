import React from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

export const Select = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Select an option',
  disabled = false,
  hasError = false,
  ariaDescribedBy,
}: SelectProps) => {
  return (
    <div className={styles.selectWrapper}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={ariaDescribedBy}
        className={`${styles.select} ${hasError ? styles.error : ''}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

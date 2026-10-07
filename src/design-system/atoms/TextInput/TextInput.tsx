import React from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps {
  id: string;
  name: string;
  type?: 'text' | 'email';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  ariaDescribedBy?: string;
  autoComplete?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  hasError = false,
  ariaDescribedBy,
  autoComplete,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={hasError}
      aria-describedby={ariaDescribedBy}
      autoComplete={autoComplete}
      className={`${styles.input} ${hasError ? styles.error : ''}`}
    />
  );
};

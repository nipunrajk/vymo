import React from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  hasError?: boolean;
  ariaDescribedBy?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  maxLength,
  disabled = false,
  hasError = false,
  ariaDescribedBy,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      disabled={disabled}
      aria-invalid={hasError}
      aria-describedby={ariaDescribedBy}
      className={`${styles.textarea} ${hasError ? styles.error : ''}`}
    />
  );
};

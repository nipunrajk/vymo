import type { FormEvent } from 'react';

export type FieldType = 'text' | 'email' | 'select' | 'textarea' | 'checkbox';

export interface SelectOption {
  label: string;
  value: string;
}

export type FormValue = string | boolean | number;
export type FormValues = Record<string, FormValue | undefined>;
export type FormErrors = Record<string, string>;
export type FormTouched = Record<string, boolean>;

export interface ValidationRules {
  required?: boolean;
  requiredMessage?: string;
  pattern?: { regex: RegExp; message: string };
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  validate?: (value: FormValue | undefined, allValues: FormValues) => string | null | undefined;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: SelectOption[];
  validations?: ValidationRules;
  condition?: (values: FormValues) => boolean;
  colSpan?: 1 | 2;
  autoComplete?: string;
}

export interface DynamicFormProps {
  config: FieldConfig[];
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting?: boolean;
  submitLabel?: string;
  onChange: (name: string, value: FormValue) => void;
  onBlur: (name: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}


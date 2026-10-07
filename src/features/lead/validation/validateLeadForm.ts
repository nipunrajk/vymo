import type { FieldConfig, FormErrors, FormValues } from '../../../design-system/form/types';

export function isFieldVisible(field: FieldConfig, values: FormValues): boolean {
  return field.condition ? Boolean(field.condition(values)) : true;
}

export function validateSingleField(field: FieldConfig, values: FormValues): string | null {
  if (!isFieldVisible(field, values)) {
    return null;
  }

  const val = values[field.name];
  const rules = field.validations;
  if (!rules) return null;

  if (rules.required) {
    if (field.type === 'checkbox') {
      if (!val) {
        return rules.requiredMessage || `${field.label} is required`;
      }
    } else {
      if (val === undefined || val === null || String(val).trim() === '') {
        return rules.requiredMessage || `${field.label} is required`;
      }
    }
  }

  // Skip format and length validation if field is optional and empty
  if (val === undefined || val === null || String(val).trim() === '') {
    return null;
  }

  const str = String(val).trim();

  if (rules.pattern && !rules.pattern.regex.test(str)) {
    return rules.pattern.message;
  }

  if (rules.minLength && str.length < rules.minLength.value) {
    return rules.minLength.message;
  }

  if (rules.maxLength && str.length > rules.maxLength.value) {
    return rules.maxLength.message;
  }

  if (rules.validate) {
    const customErr = rules.validate(val, values);
    if (customErr) return customErr;
  }

  return null;
}

export function validateLeadForm(config: FieldConfig[], values: FormValues): FormErrors {
  const errors: FormErrors = {};

  for (const field of config) {
    const error = validateSingleField(field, values);
    if (error) {
      errors[field.name] = error;
    }
  }

  return errors;
}


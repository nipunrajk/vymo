import type { FieldConfig, FormErrors, FormValues } from '../../../design-system/form/types';

/**
 * Evaluates whether a field is currently visible based on its condition.
 */
export function isFieldVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.condition) return true;
  return Boolean(field.condition(values));
}

/**
 * Validates a single field against its configured validation rules.
 * Pure function: (field, values) => error message | null.
 */
export function validateSingleField(field: FieldConfig, values: FormValues): string | null {
  // If field is conditionally hidden (e.g. Company name when Lead type is Individual),
  // it is not validated and produces no error.
  if (!isFieldVisible(field, values)) {
    return null;
  }

  const val = values[field.name];
  const rules = field.validations;
  if (!rules) return null;

  // 1. Required Check
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

  // If not required and empty, skip format/pattern/length checks
  if (val === undefined || val === null || String(val).trim() === '') {
    return null;
  }

  const stringVal = String(val).trim();

  // 2. Pattern Regex Check (e.g. email format, phone 10 digits)
  if (rules.pattern && !rules.pattern.regex.test(stringVal)) {
    return rules.pattern.message;
  }

  // 3. MinLength Check
  if (rules.minLength && stringVal.length < rules.minLength.value) {
    return rules.minLength.message;
  }

  // 4. MaxLength Check
  if (rules.maxLength && stringVal.length > rules.maxLength.value) {
    return rules.maxLength.message;
  }

  // 5. Custom Validator Check
  if (rules.validate) {
    const customErr = rules.validate(val, values);
    if (customErr) return customErr;
  }

  return null;
}

/**
 * Validates the entire form given the configuration array and current values.
 * Pure function: (config, values) => errors.
 * Input components contain zero lead or validation rules.
 */
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

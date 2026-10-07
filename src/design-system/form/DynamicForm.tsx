import { TextInput } from '../atoms/TextInput/TextInput';
import { Select } from '../atoms/Select/Select';
import { Checkbox } from '../atoms/Checkbox/Checkbox';
import { Textarea } from '../atoms/Textarea/Textarea';
import { Button } from '../atoms/Button/Button';
import { Field } from '../molecules/Field/Field';
import type { DynamicFormProps, FieldConfig } from './types';
import styles from './DynamicForm.module.css';

export const DynamicForm = ({
  config,
  values,
  errors,
  touched,
  isSubmitting = false,
  submitLabel = 'Submit',
  onChange,
  onBlur,
  onSubmit,
}: DynamicFormProps) => {
  const renderFieldControl = (field: FieldConfig, fieldId: string, hasError: boolean, ariaDescribedBy?: string) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <TextInput
            id={fieldId}
            name={field.name}
            type={field.type}
            value={String(values[field.name] ?? '')}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            placeholder={field.placeholder}
            hasError={hasError}
            ariaDescribedBy={ariaDescribedBy}
            autoComplete={field.autoComplete}
          />
        );

      case 'select':
        return (
          <Select
            id={fieldId}
            name={field.name}
            value={String(values[field.name] ?? '')}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            options={field.options ?? []}
            placeholder={field.placeholder}
            hasError={hasError}
            ariaDescribedBy={ariaDescribedBy}
          />
        );

      case 'textarea':
        return (
          <Textarea
            id={fieldId}
            name={field.name}
            value={String(values[field.name] ?? '')}
            onChange={(e) => onChange(field.name, e.target.value)}
            onBlur={() => onBlur(field.name)}
            placeholder={field.placeholder}
            maxLength={field.validations?.maxLength?.value}
            hasError={hasError}
            ariaDescribedBy={ariaDescribedBy}
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            id={fieldId}
            name={field.name}
            checked={Boolean(values[field.name])}
            onChange={(e) => onChange(field.name, e.target.checked)}
            onBlur={() => onBlur(field.name)}
            label={field.label}
            hasError={hasError}
            ariaDescribedBy={ariaDescribedBy}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className={styles.form}>
      <div className={styles.grid}>
        {config.map((field) => {
          if (field.condition && !field.condition(values)) {
            return null;
          }

          const fieldId = `field-${field.name}`;
          const isTouched = Boolean(touched[field.name]);
          const fieldError = isTouched ? errors[field.name] : undefined;
          const hasError = Boolean(fieldError);

          const ariaDescriptions: string[] = [];
          if (field.hint) ariaDescriptions.push(`${fieldId}-hint`);
          if (fieldError) ariaDescriptions.push(`${fieldId}-error`);
          const ariaDescribedBy = ariaDescriptions.length > 0 ? ariaDescriptions.join(' ') : undefined;

          return (
            <Field
              key={field.name}
              id={fieldId}
              label={field.label}
              required={Boolean(field.validations?.required)}
              hint={field.hint}
              error={fieldError}
              colSpan={field.colSpan ?? 1}
              hideLabel={field.type === 'checkbox'}
            >
              {renderFieldControl(field, fieldId, hasError, ariaDescribedBy)}
            </Field>
          );
        })}
      </div>

      <div className={styles.actions}>
        <div className={styles.submitButton}>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            fullWidth={true}
          >
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};

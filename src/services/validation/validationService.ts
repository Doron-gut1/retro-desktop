import { ValidationRule, ValidationResult, ValidationError } from './types';

export class ValidationService {
  validate(data: Record<string, any>, rules: ValidationRule[]): ValidationResult {
    const errors: ValidationError[] = [];

    for (const rule of rules) {
      const value = data[rule.field];

      // Required check
      if (rule.type === 'required' && !value) {
        errors.push({
          field: rule.field,
          message: rule.message || `${rule.field} is required`
        });
        continue;
      }

      if (value) {
        // Type checks
        switch (rule.type) {
          case 'number':
            if (isNaN(Number(value))) {
              errors.push({
                field: rule.field,
                message: rule.message || `${rule.field} must be a number`
              });
            } else {
              if (rule.min !== undefined && value < rule.min) {
                errors.push({
                  field: rule.field,
                  message: rule.message || `${rule.field} must be at least ${rule.min}`
                });
              }
              if (rule.max !== undefined && value > rule.max) {
                errors.push({
                  field: rule.field,
                  message: rule.message || `${rule.field} must be at most ${rule.max}`
                });
              }
            }
            break;

          case 'date':
            if (!(value instanceof Date) && isNaN(Date.parse(value))) {
              errors.push({
                field: rule.field,
                message: rule.message || `${rule.field} must be a valid date`
              });
            }
            break;

          case 'string':
            if (typeof value !== 'string') {
              errors.push({
                field: rule.field,
                message: rule.message || `${rule.field} must be a string`
              });
            } else if (rule.pattern && !rule.pattern.test(value)) {
              errors.push({
                field: rule.field,
                message: rule.message || `${rule.field} does not match required pattern`
              });
            }
            break;
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

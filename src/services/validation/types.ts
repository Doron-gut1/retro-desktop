export interface ValidationRule {
  field: string;
  type: 'required' | 'number' | 'date' | 'string';
  min?: number;
  max?: number;
  pattern?: RegExp;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}
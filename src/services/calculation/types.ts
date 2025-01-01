export interface CalculationParams {
  propertyId: string;
  mspkod: number;
  startDate: Date;
  endDate: Date;
  sizes: PropertySize[];
  chargeTypes: number[];
}

export interface PropertySize {
  index: number;
  size: number;
  tariffCode: string;
}

export interface CalculationResult {
  success: boolean;
  totalAmount: number;
  discount?: number;
  error?: string;
  details?: CalculationDetail[];
}

export interface CalculationDetail {
  period: string;
  chargeType: number;
  amount: number;
  discount: number;
  total: number;
}
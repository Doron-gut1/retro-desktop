export interface TariffData {
  code: string;
  name: string;
  amount: number;
  maxDiscountSize?: number;
  forceHan?: boolean;
  onlyArn?: boolean;
}

export interface TariffFilters {
  fromDate?: Date;
  toDate?: Date;
  propertyType?: number;
  mspkod?: number;
}

export interface TariffResponse {
  success: boolean;
  data?: TariffData[];
  error?: string;
}
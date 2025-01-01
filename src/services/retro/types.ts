export interface RetroCalculationParams {
  propertyId: string;
  mspkod: number;
  startDate: Date;
  endDate: Date;
  chargeTypes: number[];
  isYearlyCharge?: boolean;
}

export interface RetroSizeData {
  gdl1: number;
  gdl2: number;
  gdl3: number;
  gdl4: number;
  gdl5: number;
  gdl6: number;
  gdl7: number;
  gdl8: number;
  trf1: number;
  trf2: number;
  trf3: number;
  trf4: number;
  trf5: number;
  trf6: number;
  trf7: number;
  trf8: number;
}

export interface RetroResult {
  success: boolean;
  data?: RetroCalculationResult[];
  error?: string;
}

export interface RetroCalculationResult {
  mnt: number;
  sugts: number;
  paysum: number;
  sumhan: number;
  sumhk: number;
  hesber: string;
}
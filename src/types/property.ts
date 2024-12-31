export interface Property {
  hskod: string;
  mspkod: number;
  fullname?: string;
  maintz?: number;
  godel?: number;
  gdl2?: number;
  gdl3?: number;
  gdl4?: number;
  gdl5?: number;
  gdl6?: number;
  gdl7?: number;
  gdl8?: number;
  mas?: number;
  mas2?: number;
  mas3?: number;
  mas4?: number;
  mas5?: number;
  mas6?: number;
  mas7?: number;
  mas8?: number;
  valdate?: Date;
  valdatesof?: Date;
  hkarn?: number;
}

export interface Tariff {
  kodln: number;
  sugts: number;
  mhir1: number;
  ad1: number;
  mhir2: number;
  ad2: number;
  mhir3: number;
  ad3: number;
  mhir4: number;
  ad4: number;
  mhir5: number;
  ad5: number;
  trfname: string;
  mkdmminbasis: number;
  mkdmmaxbasis: number;
}
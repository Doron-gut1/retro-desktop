export interface PropertySize {
  index: number;
  size: number;
  tariffCode: number;
  tariffName: string;
  price?: number;
}

export interface SizeUpdate {
  index: number;
  size?: number;
  tariffCode?: number;
}

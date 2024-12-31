import type { Tariff } from '../../types/property';

export interface PriceCalculationResult {
  price: number;
  details: {
    basePrice: number;
    indexFactor: number;
    periodFactor: number;
    finalPrice: number;
  };
}

export class TariffCalculations {
  static calculatePrice(
    tariff: Tariff,
    size: number,
    indexFactor: number,
    periodFactor: number
  ): PriceCalculationResult {
    let basePrice = 0;
    let remainingSize = size;
    
    // Calculate base price using tariff steps
    const steps = [
      { price: tariff.mhir1, limit: tariff.ad1 },
      { price: tariff.mhir2, limit: tariff.ad2 },
      { price: tariff.mhir3, limit: tariff.ad3 },
      { price: tariff.mhir4, limit: tariff.ad4 },
      { price: tariff.mhir5, limit: tariff.ad5 }
    ];

    let previousLimit = 0;
    for (const step of steps) {
      if (remainingSize <= 0) break;
      
      const sizeInStep = Math.min(
        remainingSize,
        step.limit - previousLimit
      );
      
      basePrice += sizeInStep * step.price;
      remainingSize -= sizeInStep;
      previousLimit = step.limit;
    }

    // Apply index factor within limits
    const limitedIndexFactor = Math.min(
      Math.max(indexFactor, tariff.mkdmminbasis),
      tariff.mkdmmaxbasis
    );

    const finalPrice = basePrice * limitedIndexFactor * periodFactor;

    return {
      price: finalPrice,
      details: {
        basePrice,
        indexFactor: limitedIndexFactor,
        periodFactor,
        finalPrice
      }
    };
  }
}
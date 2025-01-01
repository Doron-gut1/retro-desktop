export const retroQueries = {
  // שליפת פרטי נכס
  getProperty: `
    SELECT h.hskod, h.ktovet, h.sughskod,
           h.godel, h.gdl2, h.gdl3, h.gdl4, h.gdl5, h.gdl6, h.gdl7, h.gdl8,
           h.mas, h.mas2, h.mas3, h.mas4, h.mas5, h.mas6, h.mas7, h.mas8,
           h.valdate, h.valdatesof, h.hkarn
    FROM hs h
    WHERE h.hskod = @hskod
  `,

  // שליפת פרטי משלם
  getPayer: `
    SELECT m.fullname, m.maintz
    FROM msp m
    WHERE m.mspkod = @mspkod
  `,

  // בדיקת סגירת תקופה
  checkPeriod: `
    SELECT mnt FROM sagur WHERE mnt = @mnt
  `
};
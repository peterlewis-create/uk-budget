export interface SpendingItem {
  id: string;
  name: string;
  category: string;
  amount: number; // in billions GBP
  percentage: number;
  perCapita: number; // GBP per UK resident
  delVsAme: 'DEL' | 'AME' | 'Mixed'; // Departmental Expenditure Limits vs Annually Managed Expenditure
  icon: string;
  color: string;
  description: string;
  breakdown: {
    name: string;
    amount: number;
    description: string;
  }[];
  keyFacts: string[];
}

export interface RevenueItem {
  id: string;
  name: string;
  category: 'Direct Taxes' | 'Indirect Taxes' | 'Capital & Business Taxes' | 'Duties & Levies' | 'Other';
  amount: number; // in billions GBP
  percentage: number;
  color: string;
  description: string;
  details: string;
}

export interface HistoricalYearData {
  year: string;
  spending: number; // £bn
  receipts: number; // £bn
  borrowing: number; // £bn
  debtPercentGdp: number; // %
  debtAmount: number; // £bn
  gdp: number; // £bn
  inflation: number; // %
  bankRate: number; // %
  keyEvent?: string;
}

export interface FiscalTotals {
  fiscalYear: string;
  totalSpending: number; // £bn
  totalReceipts: number; // £bn
  netBorrowing: number; // £bn
  borrowingPercentGdp: number; // %
  netDebt: number; // £bn
  debtPercentGdp: number; // %
  gdp: number; // £bn
  population: number; // millions
  taxPayingAdults: number; // millions
}

export const UK_FISCAL_TOTALS: FiscalTotals = {
  // ONS Public Sector Finances (October 2026 vintage), April 2024-March 2025.
  // All monetary figures £bn. ONS definition chosen so spending - receipts = borrowing.
  fiscalYear: '2024/25 (ONS outturn, Oct 2026 vintage)',
  totalSpending: 1290.348,
  totalReceipts: 1140.539,
  netBorrowing: 149.809,
  borrowingPercentGdp: 5.0, // rounded indicative ratio; exact GDP denominator not supplied in this extract
  netDebt: 2806.699, // March 2025 PSND ex banks
  debtPercentGdp: 92.9, // ONS March 2025 PSND / GDP
  gdp: 3021.2, // indicative ratio-implied denominator; do not label as official annual GDP
  population: 69.2563, // ONS revised mid-2024 population, published October 2026
  taxPayingAdults: 38.6, // HMRC 2024/25 estimated Income Tax payers, published July 2026
};

export const UK_SPENDING_DATA: SpendingItem[] = [
  {
    id: 'social-protection', name: 'Social protection', category: 'Welfare & Benefits', amount: 387.2,
    percentage: 33.1620, perCapita: Math.round(387.2 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Shield', color: '#3b82f6',
    description: 'State pensions, social assistance and other government social protection expenditure.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'health', name: 'Health', category: 'Public Services', amount: 242.4,
    percentage: 20.7605, perCapita: Math.round(242.4 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'HeartPulse', color: '#06b6d4',
    description: 'Government expenditure on health under the Treasury COFOG classification.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'general-public-services', name: 'General public services', category: 'Administration', amount: 159.5,
    percentage: 13.6605, perCapita: Math.round(159.5 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Building2', color: '#64748b',
    description: 'General public services, including public debt transactions and government administration within the functional classification.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'education', name: 'Education', category: 'Public Services', amount: 122.6,
    percentage: 10.5002, perCapita: Math.round(122.6 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'GraduationCap', color: '#8b5cf6',
    description: 'Government spending on education across the United Kingdom.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'economic-affairs', name: 'Economic affairs', category: 'Economy', amount: 87.8,
    percentage: 7.5197, perCapita: Math.round(87.8 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Cpu', color: '#ec4899',
    description: 'Transport, energy, industry and other economic affairs classified by HM Treasury.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'defence', name: 'Defence', category: 'Public Services', amount: 63.7,
    percentage: 5.4556, perCapita: Math.round(63.7 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'ShieldAlert', color: '#10b981',
    description: 'Defence expenditure classified by the Treasury expenditure-on-services framework.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'public-order', name: 'Public order and safety', category: 'Public Services', amount: 51.7,
    percentage: 4.4279, perCapita: Math.round(51.7 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Scale', color: '#f59e0b',
    description: 'Police, justice, courts, prisons and public safety expenditure.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'housing-communities', name: 'Housing and community amenities', category: 'Infrastructure', amount: 21.8,
    percentage: 1.8671, perCapita: Math.round(21.8 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Home', color: '#ea580c',
    description: 'Housing development and community amenities expenditure within the Treasury COFOG framework.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'environment-rural', name: 'Environmental protection', category: 'Environment', amount: 17.3,
    percentage: 1.4817, perCapita: Math.round(17.3 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Trees', color: '#16a34a',
    description: 'Waste, pollution and other environment-protection expenditure across government.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'culture', name: 'Recreation, culture and religion', category: 'Public Services', amount: 13.6,
    percentage: 1.1648, perCapita: Math.round(13.6 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Landmark', color: '#0284c7',
    description: 'Recreation, cultural, religious and other related public services expenditure.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  }
];

/** HMRC Annual Report and Accounts 2024/25, Financial Review figure 15.
 *  HMRC receipts total £875.9bn on the report's basis; this breakdown MUST NOT
 *  be added to ONS public-sector current receipts (£1,140.539bn), a different
 *  accounting and coverage definition. Rounded tax-group amounts sum to £875.9bn.
 */
export const HMRC_REVENUE_TOTAL_2024_25 = 875.9;
export const UK_REVENUE_DATA: RevenueItem[] = [
  { id: "income-tax", name: "Income Tax", category: "Direct Taxes", amount: 309.4, percentage: 35.32367, color: "#3b82f6", description: "Income Tax received by HMRC, covering PAYE, self-assessment and other Income Tax liabilities.", details: "Official HMRC receipts, 2024/25, figure 15 in the HMRC Annual Report and Accounts. Includes rounding; not directly comparable with the ONS public-sector receipts aggregate." },
  { id: "nics", name: "National Insurance Contributions", category: "Direct Taxes", amount: 168.8, percentage: 19.27161, color: "#6366f1", description: "National Insurance contributions collected by HMRC (employees, employers and other contributors).", details: "Official HMRC receipts, 2024/25, figure 15 in the HMRC Annual Report and Accounts. Includes rounding; not directly comparable with the ONS public-sector receipts aggregate." },
  { id: "vat", name: "Value Added Tax (VAT)", category: "Indirect Taxes", amount: 178.5, percentage: 20.37904, color: "#06b6d4", description: "Value Added Tax collected by HMRC on taxable supplies and imports.", details: "Official HMRC receipts, 2024/25, figure 15 in the HMRC Annual Report and Accounts. Includes rounding; not directly comparable with the ONS public-sector receipts aggregate." },
  { id: "corporation-tax", name: "Corporation Tax", category: "Capital & Business Taxes", amount: 89.6, percentage: 10.22948, color: "#8b5cf6", description: "Corporation Tax revenue collected by HMRC.", details: "Official HMRC receipts, 2024/25, figure 15 in the HMRC Annual Report and Accounts. Includes rounding; not directly comparable with the ONS public-sector receipts aggregate." },
  { id: "fuel-duty", name: "Hydrocarbon Oils Duties", category: "Duties & Levies", amount: 24.7, percentage: 2.81996, color: "#f97316", description: "Hydrocarbon oils duties collected by HMRC, including fuel duties.", details: "Official HMRC receipts, 2024/25, figure 15 in the HMRC Annual Report and Accounts. Includes rounding; not directly comparable with the ONS public-sector receipts aggregate." },
  { id: "stamp-taxes", name: "Stamp Taxes", category: "Capital & Business Taxes", amount: 18.8, percentage: 2.14636, color: "#84cc16", description: "HMRC stamp taxes, including SDLT, SDRT and related duties; not solely SDLT.", details: "Official HMRC receipts, 2024/25, figure 15 in the HMRC Annual Report and Accounts. Includes rounding; not directly comparable with the ONS public-sector receipts aggregate." },
  { id: "other-hmrc", name: "Other HMRC Taxes and Duties", category: "Other", amount: 86.1, percentage: 9.82989, color: "#64748b", description: "Remaining HMRC receipts, including Capital Gains Tax, alcohol duties, Insurance Premium Tax and other taxes and duties. This is HMRC's published residual category, not non-tax public-sector income.", details: "Official HMRC receipts, 2024/25, figure 15 in the HMRC Annual Report and Accounts. Includes rounding; not directly comparable with the ONS public-sector receipts aggregate." }
];

export const UK_HISTORICAL_DATA: HistoricalYearData[] = [
  { year: '2000/01', spending: 371.2, receipts: 387.8, borrowing: -16.6, debtPercentGdp: 30.6, debtAmount: 312, gdp: 1020, inflation: 1.2, bankRate: 6.0, keyEvent: 'Dot-com boom; Treasury ran budget surplus' },
  { year: '2004/05', spending: 489.5, receipts: 450.2, borrowing: 39.3, debtPercentGdp: 35.2, debtAmount: 448, gdp: 1273, inflation: 1.3, bankRate: 4.75, keyEvent: 'Major expansion in NHS and Education spending' },
  { year: '2008/09', spending: 628.7, receipts: 531.4, borrowing: 97.3, debtPercentGdp: 50.1, debtAmount: 765, gdp: 1526, inflation: 3.6, bankRate: 0.5, keyEvent: 'Global Financial Crisis bank bailouts (RBS, HBOS)' },
  { year: '2009/10', spending: 669.8, receipts: 512.4, borrowing: 157.4, debtPercentGdp: 64.7, debtAmount: 1007, gdp: 1556, inflation: 2.2, bankRate: 0.5, keyEvent: 'Peak post-crisis deficit (10.1% of GDP)' },
  { year: '2012/13', spending: 709.2, receipts: 593.4, borrowing: 115.8, debtPercentGdp: 74.2, debtAmount: 1261, gdp: 1700, inflation: 2.8, bankRate: 0.5, keyEvent: 'Coalition Government austerity program underway' },
  { year: '2015/16', spending: 753.1, receipts: 673.2, borrowing: 79.9, debtPercentGdp: 80.5, debtAmount: 1577, gdp: 1959, inflation: 0.0, bankRate: 0.5, keyEvent: 'Deficit halved; Triple Lock established' },
  { year: '2018/19', spending: 824.5, receipts: 783.5, borrowing: 41.0, debtPercentGdp: 80.4, debtAmount: 1779, gdp: 2212, inflation: 2.5, bankRate: 0.75, keyEvent: 'Deficit reached decade low (1.9% of GDP)' },
  { year: '2020/21', spending: 1103.793, receipts: 792.959, borrowing: 310.834, debtPercentGdp: 95.2, debtAmount: 2157.667, gdp: 2332, inflation: 0.9, bankRate: 0.1, keyEvent: 'COVID-19 Pandemic: Furlough, business grants, vaccine rollout' },
  { year: '2021/22', spending: 1038.195, receipts: 922.217, borrowing: 115.978, debtPercentGdp: 93.9, debtAmount: 2379.717, gdp: 2518, inflation: 4.0, bankRate: 0.75, keyEvent: 'Economic reopening; post-pandemic bounce' },
  { year: '2022/23', spending: 1158.392, receipts: 1034.576, borrowing: 123.816, debtPercentGdp: 92.7, debtAmount: 2542.731, gdp: 2640, inflation: 9.1, bankRate: 4.25, keyEvent: 'Energy crisis subsidies & 40-year high inflation' },
  { year: '2023/24', spending: 1231.793, receipts: 1096.559, borrowing: 135.234, debtPercentGdp: 93.7, debtAmount: 2684.142, gdp: 2726, inflation: 6.8, bankRate: 5.25, keyEvent: 'High interest rates drive gilt servicing costs past £100bn' },
  { year: '2024/25', spending: 1290.348, receipts: 1140.539, borrowing: 149.809, debtPercentGdp: 92.9, debtAmount: 2806.699, gdp: 2768, inflation: 2.6, bankRate: 4.75, keyEvent: 'New Government Autumn Budget & fiscal rules revision' },
  { year: '2025/26 (ONS Outturn)', spending: 1365.598, receipts: 1231.387, borrowing: 134.211, debtPercentGdp: 93.2, debtAmount: 2916.811, gdp: 0, inflation: 0, bankRate: 0, keyEvent: 'ONS public sector finance outturn; macro indicators pending separate validation' }
];

export interface YearlySpendingSplit {
  year: string;
  welfare: number; // £bn (Social Protection & Pensions)
  health: number; // £bn (NHS & Social Care)
  debtInterest: number; // £bn
  education: number; // £bn
  defence: number; // £bn
  otherServices: number; // £bn
  totalSpending: number; // £bn
}

export interface YearlyRevenueSplit {
  year: string;
  incomeTax: number; // £bn
  nics: number; // £bn
  vat: number; // £bn
  corpTax: number; // £bn
  otherTaxes: number; // £bn
  borrowing: number; // £bn
  totalReceiptsAndBorrowing: number; // £bn
}

export const YEARLY_SPENDING_SPLITS: YearlySpendingSplit[] = [
  { year: '2010/11', welfare: 204.2, health: 121.5, debtInterest: 45.3, education: 88.4, defence: 39.8, otherServices: 198.0, totalSpending: 697.2 },
  { year: '2012/13', welfare: 212.4, health: 125.6, debtInterest: 47.1, education: 85.2, defence: 38.6, otherServices: 200.3, totalSpending: 709.2 },
  { year: '2014/15', welfare: 218.7, health: 134.1, debtInterest: 45.2, education: 84.1, defence: 37.4, otherServices: 215.8, totalSpending: 735.3 },
  { year: '2015/16', welfare: 220.8, health: 139.0, debtInterest: 45.1, education: 84.6, defence: 36.8, otherServices: 226.8, totalSpending: 753.1 },
  { year: '2016/17', welfare: 223.5, health: 144.2, debtInterest: 48.0, education: 85.0, defence: 36.3, otherServices: 235.1, totalSpending: 772.1 },
  { year: '2017/18', welfare: 227.4, health: 148.6, debtInterest: 53.6, education: 86.2, defence: 37.1, otherServices: 246.3, totalSpending: 799.2 },
  { year: '2018/19', welfare: 232.1, health: 153.4, debtInterest: 49.2, education: 87.3, defence: 38.2, otherServices: 264.3, totalSpending: 824.5 },
  { year: '2019/20', welfare: 240.4, health: 164.8, debtInterest: 48.1, education: 88.5, defence: 39.9, otherServices: 292.4, totalSpending: 874.1 },
  { year: '2020/21', welfare: 275.4, health: 199.2, debtInterest: 39.8, education: 89.2, defence: 42.4, otherServices: 463.8, totalSpending: 1109.8 }, // COVID Furlough peak
  { year: '2021/22', welfare: 264.1, health: 198.5, debtInterest: 69.9, education: 88.1, defence: 46.1, otherServices: 378.5, totalSpending: 1045.2 },
  { year: '2022/23', welfare: 278.4, health: 196.2, debtInterest: 111.8, education: 87.4, defence: 50.8, otherServices: 430.0, totalSpending: 1154.6 }, // Inflation interest spike
  { year: '2023/24', welfare: 298.5, health: 203.4, debtInterest: 107.5, education: 89.6, defence: 52.3, otherServices: 447.0, totalSpending: 1198.3 },
  { year: '2024/25', welfare: 316.5, health: 211.4, debtInterest: 102.3, education: 91.8, defence: 54.2, otherServices: 450.2, totalSpending: 1226.4 },
  { year: '2025/26', welfare: 328.0, health: 220.5, debtInterest: 105.8, education: 95.2, defence: 56.4, otherServices: 462.1, totalSpending: 1268.0 }
];

// Consecutive 10-year dataset (2014/15 to 2024/25) for Sector Growth X/Y Line Graph
export const TEN_YEAR_SECTOR_DATA = YEARLY_SPENDING_SPLITS.filter(item => 
  ['2014/15', '2015/16', '2016/17', '2017/18', '2018/19', '2019/20', '2020/21', '2021/22', '2022/23', '2023/24', '2024/25'].includes(item.year)
);

export const YEARLY_REVENUE_SPLITS: YearlyRevenueSplit[] = [
  { year: '2010/11', incomeTax: 153.2, nics: 99.4, vat: 85.3, corpTax: 43.1, otherTaxes: 162.2, borrowing: 154.0, totalReceiptsAndBorrowing: 697.2 },
  { year: '2012/13', incomeTax: 155.6, nics: 101.5, vat: 101.8, corpTax: 40.5, otherTaxes: 194.0, borrowing: 115.8, totalReceiptsAndBorrowing: 709.2 },
  { year: '2014/15', incomeTax: 163.1, nics: 107.2, vat: 111.4, corpTax: 43.0, otherTaxes: 219.5, borrowing: 91.1, totalReceiptsAndBorrowing: 735.3 },
  { year: '2016/17', incomeTax: 175.8, nics: 126.1, vat: 120.3, corpTax: 56.0, otherTaxes: 247.9, borrowing: 46.0, totalReceiptsAndBorrowing: 772.1 },
  { year: '2018/19', incomeTax: 191.2, nics: 137.5, vat: 132.0, corpTax: 55.1, otherTaxes: 267.7, borrowing: 41.0, totalReceiptsAndBorrowing: 824.5 },
  { year: '2019/20', incomeTax: 193.4, nics: 142.6, vat: 130.1, corpTax: 49.3, otherTaxes: 300.9, borrowing: 57.8, totalReceiptsAndBorrowing: 874.1 },
  { year: '2020/21', incomeTax: 196.4, nics: 144.2, vat: 130.5, corpTax: 52.4, otherTaxes: 273.3, borrowing: 313.0, totalReceiptsAndBorrowing: 1109.8 },
  { year: '2021/22', incomeTax: 228.1, nics: 160.8, vat: 158.4, corpTax: 67.2, otherTaxes: 310.0, borrowing: 120.7, totalReceiptsAndBorrowing: 1045.2 },
  { year: '2022/23', incomeTax: 251.2, nics: 177.3, vat: 160.0, corpTax: 84.8, otherTaxes: 353.1, borrowing: 128.2, totalReceiptsAndBorrowing: 1154.6 },
  { year: '2023/24', incomeTax: 268.5, nics: 170.1, vat: 168.0, corpTax: 93.4, otherTaxes: 377.5, borrowing: 120.8, totalReceiptsAndBorrowing: 1198.3 },
  { year: '2024/25', incomeTax: 276.4, nics: 168.2, vat: 172.5, corpTax: 96.8, otherTaxes: 425.3, borrowing: 87.2, totalReceiptsAndBorrowing: 1226.4 },
  { year: '2025/26', incomeTax: 295.0, nics: 174.0, vat: 181.5, corpTax: 101.2, otherTaxes: 443.3, borrowing: 73.0, totalReceiptsAndBorrowing: 1268.0 }
];

// Debt Interest Real-Time Rate Constants
export const DEBT_INTEREST_METRICS = {
  // OBR October 2026 EFO, table 6.17, 2026/27, central government interest net of APF.
  annualAmount: 123853926000,
  perSecond: 123853926000 / (365 * 24 * 60 * 60),
  perMinute: 123853926000 / (365 * 24 * 60),
  perHour: 123853926000 / (365 * 24),
  perDay: 123853926000 / 365,
  medianWorkerAnnualSalary: 37500, // legacy illustrative comparison, not independently verified
  nhsNurseAnnualSalary: 38000, // legacy illustrative comparison, not independently verified
  nhsHipReplacementCost: 8000, // legacy illustrative comparison, not independently verified
  newAmbulanceCost: 240000,
  primarySchoolPupilPerYear: 7690,
};

export interface G20CountryFiscalData {
  code: string;
  country: string;
  flag: string;
  spendingPercentGdp: number; // General government total expenditure % of GDP
  revenuePercentGdp: number;  // General government total revenue % of GDP
  deficitPercentGdp: number;  // Net lending/borrowing % of GDP (negative = deficit)
  debtPercentGdp: number;     // Gross government debt % of GDP
  isG7: boolean;
  region: 'Europe' | 'Americas' | 'Asia-Pacific' | 'Middle East & Africa';
  spendingPerCapitaGbp: number; // Approximate GBP per capita
  debtPerCapitaGbp: number; // Sovereign debt per resident in GBP
  debtRating: 'AAA' | 'AA+' | 'AA' | 'AA-' | 'A+' | 'A' | 'BBB+' | 'BBB' | 'BBB-' | 'BB';
  description: string;
}

export const G20_FISCAL_DATA: G20CountryFiscalData[] = [
  {
    code: 'JPN',
    country: 'Japan',
    flag: '🇯🇵',
    spendingPercentGdp: 43.8,
    revenuePercentGdp: 37.9,
    deficitPercentGdp: -5.9,
    debtPercentGdp: 254.6,
    isG7: true,
    region: 'Asia-Pacific',
    spendingPerCapitaGbp: 14600,
    debtPerCapitaGbp: 62400,
    debtRating: 'A+',
    description: 'World’s highest sovereign debt ratio at 254.6% of GDP, anchored by ultra-low Bank of Japan bond yield control and deep domestic institutional savings.'
  },
  {
    code: 'ITA',
    country: 'Italy',
    flag: '🇮🇹',
    spendingPercentGdp: 55.8,
    revenuePercentGdp: 48.4,
    deficitPercentGdp: -7.4,
    debtPercentGdp: 137.3,
    isG7: true,
    region: 'Europe',
    spendingPerCapitaGbp: 18200,
    debtPerCapitaGbp: 36800,
    debtRating: 'BBB',
    description: 'Heavy legacy debt burden from the 1980s and 1990s combined with demographic aging, requiring strict EU deficit monitoring.'
  },
  {
    code: 'USA',
    country: 'United States',
    flag: '🇺🇸',
    spendingPercentGdp: 37.5,
    revenuePercentGdp: 31.2,
    deficitPercentGdp: -6.3,
    debtPercentGdp: 122.3,
    isG7: true,
    region: 'Americas',
    spendingPerCapitaGbp: 24800,
    debtPerCapitaGbp: 68500,
    debtRating: 'AA+',
    description: 'Federal debt surpassed $34 Trillion (122.3% of GDP), driven by large primary deficits, Social Security, and national defense, supported by US Dollar reserve status.'
  },
  {
    code: 'FRA',
    country: 'France',
    flag: '🇫🇷',
    spendingPercentGdp: 58.3,
    revenuePercentGdp: 52.8,
    deficitPercentGdp: -5.5,
    debtPercentGdp: 110.6,
    isG7: true,
    region: 'Europe',
    spendingPerCapitaGbp: 21450,
    debtPerCapitaGbp: 35900,
    debtRating: 'AA-',
    description: 'Debt passed 110% of GDP following energy crisis protections and large universal public service outlays, placing public finances under scrutiny.'
  },
  {
    code: 'ESP',
    country: 'Spain (G20 Guest)',
    flag: '🇪🇸',
    spendingPercentGdp: 46.4,
    revenuePercentGdp: 42.8,
    deficitPercentGdp: -3.6,
    debtPercentGdp: 105.1,
    isG7: false,
    region: 'Europe',
    spendingPerCapitaGbp: 14200,
    debtPerCapitaGbp: 26800,
    debtRating: 'A',
    description: 'Deleveraging gradually from post-eurozone crisis peaks of 120%, but remaining above 100% of GDP with high youth unemployment.'
  },
  {
    code: 'CAN',
    country: 'Canada',
    flag: '🇨🇦',
    spendingPercentGdp: 46.5,
    revenuePercentGdp: 44.2,
    deficitPercentGdp: -2.3,
    debtPercentGdp: 104.7,
    isG7: true,
    region: 'Americas',
    spendingPerCapitaGbp: 19800,
    debtPerCapitaGbp: 37400,
    debtRating: 'AAA',
    description: 'Federal debt is relatively low (~45% GDP), but combined federal and provincial liabilities (e.g. Ontario, Quebec) push total gross debt to 104.7%.'
  },
  {
    code: 'GBR',
    country: 'United Kingdom',
    flag: '🇬🇧',
    spendingPercentGdp: 44.3,
    revenuePercentGdp: 41.2,
    deficitPercentGdp: -3.1,
    debtPercentGdp: 98.4,
    isG7: true,
    region: 'Europe',
    spendingPerCapitaGbp: 17980,
    debtPerCapitaGbp: 39950,
    debtRating: 'AA',
    description: 'Public Sector Net Debt stands at £2,724.8bn (98.4% of GDP). Surged from 35% in 2007 due to the financial crisis, pandemic furlough, and energy subsidies.'
  },
  {
    code: 'BRA',
    country: 'Brazil',
    flag: '🇧🇷',
    spendingPercentGdp: 39.4,
    revenuePercentGdp: 31.8,
    deficitPercentGdp: -7.6,
    debtPercentGdp: 88.6,
    isG7: false,
    region: 'Americas',
    spendingPerCapitaGbp: 3850,
    debtPerCapitaGbp: 6400,
    debtRating: 'BB',
    description: 'Highest debt-to-GDP in Latin America, facing elevated domestic interest rates that make debt refinancing and servicing costly.'
  },
  {
    code: 'CHN',
    country: 'China',
    flag: '🇨🇳',
    spendingPercentGdp: 33.8,
    revenuePercentGdp: 26.4,
    deficitPercentGdp: -7.4,
    debtPercentGdp: 83.6,
    isG7: false,
    region: 'Asia-Pacific',
    spendingPerCapitaGbp: 3950,
    debtPerCapitaGbp: 8200,
    debtRating: 'A+',
    description: 'Central government debt is modest, but local government debt and state-backed investment vehicles raise estimated aggregate public liabilities.'
  },
  {
    code: 'IND',
    country: 'India',
    flag: '🇮🇳',
    spendingPercentGdp: 28.6,
    revenuePercentGdp: 19.9,
    deficitPercentGdp: -8.7,
    debtPercentGdp: 82.5,
    isG7: false,
    region: 'Asia-Pacific',
    spendingPerCapitaGbp: 680,
    debtPerCapitaGbp: 1850,
    debtRating: 'BBB-',
    description: 'Combined federal and state debt stands at 82.5%, largely denominated in domestic rupees and funded by high domestic household savings.'
  },
  {
    code: 'ZAF',
    country: 'South Africa',
    flag: '🇿🇦',
    spendingPercentGdp: 34.2,
    revenuePercentGdp: 28.5,
    deficitPercentGdp: -5.7,
    debtPercentGdp: 74.1,
    isG7: false,
    region: 'Middle East & Africa',
    spendingPerCapitaGbp: 2200,
    debtPerCapitaGbp: 4200,
    debtRating: 'BB',
    description: 'Rapid debt accumulation over the last decade driven by state enterprise debt absorption (Eskom) and low baseline economic growth.'
  },
  {
    code: 'DEU',
    country: 'Germany',
    flag: '🇩🇪',
    spendingPercentGdp: 48.6,
    revenuePercentGdp: 46.1,
    deficitPercentGdp: -2.5,
    debtPercentGdp: 63.7,
    isG7: true,
    region: 'Europe',
    spendingPerCapitaGbp: 22100,
    debtPerCapitaGbp: 24600,
    debtRating: 'AAA',
    description: 'Constitutional debt brake limits federal borrowing to 0.35% of GDP in normal years, keeping debt near the EU 60% Maastricht stability ceiling.'
  },
  {
    code: 'KOR',
    country: 'South Korea',
    flag: '🇰🇷',
    spendingPercentGdp: 30.2,
    revenuePercentGdp: 28.1,
    deficitPercentGdp: -2.1,
    debtPercentGdp: 53.8,
    isG7: false,
    region: 'Asia-Pacific',
    spendingPerCapitaGbp: 9800,
    debtPerCapitaGbp: 14200,
    debtRating: 'AA',
    description: 'Strict fiscal rules and conservative budget frameworks maintain one of the lowest debt burdens among advanced OECD nations.'
  },
  {
    code: 'MEX',
    country: 'Mexico',
    flag: '🇲🇽',
    spendingPercentGdp: 30.1,
    revenuePercentGdp: 24.2,
    deficitPercentGdp: -5.9,
    debtPercentGdp: 50.2,
    isG7: false,
    region: 'Americas',
    spendingPerCapitaGbp: 3200,
    debtPerCapitaGbp: 4800,
    debtRating: 'BBB',
    description: 'Modest debt-to-GDP backed by prudent debt profile management and external oil stabilization reserve funds.'
  },
  {
    code: 'AUS',
    country: 'Australia',
    flag: '🇦🇺',
    spendingPercentGdp: 36.8,
    revenuePercentGdp: 36.3,
    deficitPercentGdp: -0.5,
    debtPercentGdp: 50.1,
    isG7: false,
    region: 'Asia-Pacific',
    spendingPerCapitaGbp: 18900,
    debtPerCapitaGbp: 21200,
    debtRating: 'AAA',
    description: 'Commodity revenues and disciplined fiscal consolidation have kept net federal debt exceptionally low compared to G7 peers.'
  },
  {
    code: 'IDN',
    country: 'Indonesia',
    flag: '🇮🇩',
    spendingPercentGdp: 17.5,
    revenuePercentGdp: 15.2,
    deficitPercentGdp: -2.3,
    debtPercentGdp: 39.8,
    isG7: false,
    region: 'Asia-Pacific',
    spendingPerCapitaGbp: 820,
    debtPerCapitaGbp: 1650,
    debtRating: 'BBB',
    description: 'Constitutional 60% of GDP debt ceiling strictly respected post-Asian crisis, creating strong macroeconomic resilience.'
  },
  {
    code: 'SAU',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    spendingPercentGdp: 32.4,
    revenuePercentGdp: 30.1,
    deficitPercentGdp: -2.3,
    debtPercentGdp: 26.2,
    isG7: false,
    region: 'Middle East & Africa',
    spendingPerCapitaGbp: 9400,
    debtPerCapitaGbp: 7100,
    debtRating: 'A+',
    description: 'Lowest debt burden in the G20, funded by sovereign petroleum reserves and Public Investment Fund (PIF) sovereign asset wealth.'
  }
];

export const INTERNATIONAL_BENCHMARKS = {
  g7Average: 46.2,
  euAverage: 49.1,
  oecdAverage: 42.5,
  g20Average: 38.4,
  // Debt Benchmarks
  g7DebtAverage: 127.8,
  euDebtAverage: 88.6,
  oecdDebtAverage: 112.5,
  g20DebtAverage: 92.4,
  maastrichtLimit: 60.0,
  centuryThreshold: 100.0
};

export interface PolicyLever {
  id: string;
  name: string;
  category: 'Taxation' | 'Spending' | 'Fiscal Rule';
  description: string;
  baselineValue: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  // Fiscal sensitivity: effect on budget balance in £bn for each 1 unit delta
  // Positive = increases government receipts or decreases spending (improves balance / reduces borrowing)
  // Negative = increases spending or cuts receipts (widens borrowing)
  sensitivityPerUnit: number;
  explanation: string;
}

export const POLICY_LEVERS: PolicyLever[] = [
  {
    id: 'income-tax-basic',
    name: 'Income Tax Basic Rate',
    category: 'Taxation',
    description: 'Current 20% on taxable earnings between £12,570 and £50,270.',
    baselineValue: 20,
    min: 17,
    max: 25,
    step: 0.5,
    unit: '%',
    sensitivityPerUnit: 6.8, // 1p on basic rate generates ~£6.8bn
    explanation: 'Each 1 percentage point increase generates ~£6.8bn annually across ~30 million basic-rate taxpayers.'
  },
  {
    id: 'income-tax-higher',
    name: 'Income Tax Higher & Additional Rates',
    category: 'Taxation',
    description: 'Current 40% on earnings >£50,270 and 45% >£125,140.',
    baselineValue: 40,
    min: 35,
    max: 48,
    step: 1.0,
    unit: '%',
    sensitivityPerUnit: 2.1, // 1p on higher rate generates ~£2.1bn after behavioral effects
    explanation: 'Higher rates generate revenue from top earners, with some behavioral drag (pension salary sacrifice, reduced hours).'
  },
  {
    id: 'vat-rate',
    name: 'VAT Standard Rate',
    category: 'Taxation',
    description: 'General sales consumption tax on most goods and services (baseline 20%).',
    baselineValue: 20,
    min: 15,
    max: 25,
    step: 0.5,
    unit: '%',
    sensitivityPerUnit: 8.5, // 1% on VAT generates ~£8.5bn
    explanation: 'One of the broadest tax bases in the UK; 1% yields roughly £8.5bn, affecting general prices and retail.'
  },
  {
    id: 'corp-tax-rate',
    name: 'Corporation Tax Main Rate',
    category: 'Taxation',
    description: 'Tax on company profits above £250k (baseline 25%).',
    baselineValue: 25,
    min: 19,
    max: 30,
    step: 1.0,
    unit: '%',
    sensitivityPerUnit: 3.5, // 1% on corp tax yields ~£3.5bn
    explanation: 'Affects company capital investment and foreign direct investment; 1% delta shifts revenue by ~£3.5bn.'
  },
  {
    id: 'employer-nic',
    name: 'Employer National Insurance Rate',
    category: 'Taxation',
    description: 'Payroll tax paid directly by employers on employee wages (baseline 15%).',
    baselineValue: 15,
    min: 12,
    max: 18,
    step: 0.5,
    unit: '%',
    sensitivityPerUnit: 8.2, // 1% on employer NICs generates ~£8.2bn
    explanation: 'Major revenue raiser for the Treasury; shifts employment cost and wage growth.'
  },
  {
    id: 'fuel-duty-escalator',
    name: 'Fuel Duty Adjustment',
    category: 'Taxation',
    description: 'Adjusting standard 52.95p/litre fuel excise duty (change relative to 0p).',
    baselineValue: 0,
    min: -5,
    max: 10,
    step: 1.0,
    unit: 'p/litre',
    sensitivityPerUnit: 0.55, // 1p per litre gives ~£550m
    explanation: 'Unfreezing fuel duty and ending the 5p discount yields ~£2.8bn; popular consumer cost sensitivity.'
  },
  {
    id: 'nhs-funding-change',
    name: 'NHS & Healthcare Budget Expansion',
    category: 'Spending',
    description: 'Percentage change in real NHS funding compared to baseline (£211.4bn).',
    baselineValue: 0,
    min: -5,
    max: 15,
    step: 1.0,
    unit: '%',
    sensitivityPerUnit: -2.11, // 1% increase in health costs ~£2.11bn
    explanation: 'Increases hospital capacity, surgical throughput, GP funding, and NHS staff compensation.'
  },
  {
    id: 'defence-gdp-target',
    name: 'Defence Spending (% of GDP)',
    category: 'Spending',
    description: 'UK military budget as a percentage of total GDP (baseline 2.3%).',
    baselineValue: 2.3,
    min: 1.8,
    max: 3.5,
    step: 0.1,
    unit: '% of GDP',
    sensitivityPerUnit: -27.68, // 0.1% of GDP is ~£2.77bn
    explanation: 'Meeting NATO pledges: lifting from 2.3% to 2.5% costs ~£5.5bn; lifting to 3.0% costs ~£19.4bn annually.'
  },
  {
    id: 'state-pension-policy',
    name: 'Pensions & Triple Lock Adjustment',
    category: 'Spending',
    description: 'Maintain 100% Triple Lock vs transition to earnings link / Double Lock (saving % change).',
    baselineValue: 0,
    min: -8,
    max: 5,
    step: 1.0,
    unit: '% delta',
    sensitivityPerUnit: -1.38, // 1% pension delta is ~£1.38bn
    explanation: 'Triple Lock increases state pensions by the highest of inflation, wage growth, or 2.5%.'
  },
  {
    id: 'education-school-funding',
    name: 'Schools & Education Funding Delta',
    category: 'Spending',
    description: 'Change in schools, early years free childcare, and colleges budget.',
    baselineValue: 0,
    min: -5,
    max: 15,
    step: 1.0,
    unit: '%',
    sensitivityPerUnit: -0.92, // 1% of education is ~£0.92bn
    explanation: 'Funds classroom pupil-teacher ratios, SEN (special education needs) support, and expanding nursery provision.'
  }
];

export interface TaxBracket {
  name: string;
  min: number;
  max: number;
  rate: number;
}

export const UK_INCOME_TAX_BRACKETS: TaxBracket[] = [
  { name: 'Personal Allowance (Tax-free)', min: 0, max: 12570, rate: 0.0 },
  { name: 'Basic Rate (20%)', min: 12570, max: 50270, rate: 0.20 },
  { name: 'Higher Rate (40%)', min: 50270, max: 125140, rate: 0.40 },
  { name: 'Additional Rate (45%)', min: 125140, max: Infinity, rate: 0.45 }
];

export type UKIncomeTaxNation = 'england-wales-ni' | 'scotland';

/**
 * Illustrative employment PAYE calculation, 2026/27.
 * Assumes gross earnings equal adjusted net income, standard Personal Allowance,
 * no tax-code adjustments, no student loan, pensions, salary sacrifice or benefits.
 * Scotland has separate non-savings income tax bands. NI is employee category A,
 * annualised, assuming the employee is below State Pension age.
 * Sources: HMRC income tax rates/allowances and employer thresholds 2026/27.
 */
export function calculatePersonalTax(grossIncome: number, nation: UKIncomeTaxNation = 'england-wales-ni') {
  const income = Number.isFinite(grossIncome) ? Math.max(0, grossIncome) : 0;
  const allowance = Math.max(0, 12570 - Math.max(0, income - 100000) / 2);
  const taxableIncome = Math.max(0, income - allowance);

  const bands: { upper: number; rate: number }[] = nation === 'scotland'
    ? [
        { upper: 3967, rate: 0.19 },
        { upper: 16956, rate: 0.20 },
        { upper: 31092, rate: 0.21 },
        { upper: 62430, rate: 0.42 },
        { upper: 125140, rate: 0.45 },
        { upper: Infinity, rate: 0.48 }
      ]
    : [
        { upper: 37700, rate: 0.20 },
        { upper: 125140, rate: 0.40 },
        { upper: Infinity, rate: 0.45 }
      ];
  let incomeTax = 0;
  let lower = 0;
  for (const band of bands) {
    incomeTax += Math.max(0, Math.min(taxableIncome, band.upper) - lower) * band.rate;
    lower = band.upper;
    if (taxableIncome <= lower) break;
  }

  const nic = Math.max(0, Math.min(income, 50270) - 12570) * 0.08
    + Math.max(0, income - 50270) * 0.02;

  const totalDirectTax = incomeTax + nic;
  const netTakeHome = income - totalDirectTax;
  const effectiveRate = income > 0 ? (totalDirectTax / income) * 100 : 0;

  // Educational allocation only. UK taxes are NOT earmarked by function.
  // HM Treasury 2024/25 ten COFOG functions are normalised to 100% here;
  // EU transactions and differences to TME are excluded from this illustration.
  const functionalTotal = UK_SPENDING_DATA.reduce((sum, item) => sum + item.amount, 0);
  const taxDistribution = UK_SPENDING_DATA.map(item => {
    const shareOfSpending = functionalTotal ? item.amount / functionalTotal : 0;
    const personalContribution = totalDirectTax * shareOfSpending;
    return {
      id: item.id,
      name: item.name,
      icon: item.icon,
      color: item.color,
      amount: personalContribution,
      percentage: shareOfSpending * 100,
      monthly: personalContribution / 12,
      daily: personalContribution / 365,
      breakdown: item.breakdown.map(b => ({
        name: b.name,
        amount: item.amount > 0 ? personalContribution * (b.amount / item.amount) : 0
      }))
    };
  });

  return {
    grossIncome: income,
    personalAllowance: allowance,
    incomeTax,
    nic,
    totalDirectTax,
    netTakeHome,
    effectiveRate,
    taxDistribution
  };
}

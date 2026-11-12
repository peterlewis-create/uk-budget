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
  population: 68.2, // legacy demographic assumption: NOT YET VERIFIED
  taxPayingAdults: 33.6, // legacy demographic assumption: NOT YET VERIFIED
};

export const UK_SPENDING_DATA: SpendingItem[] = [
  {
    id: 'social-protection',
    name: 'Social Protection & Welfare',
    category: 'Welfare & Benefits',
    amount: 316.5,
    percentage: 25.8,
    perCapita: 4640,
    delVsAme: 'AME',
    icon: 'Shield',
    color: '#3b82f6', // blue
    description: 'Financial support across life stages: State Pensions, disability benefits, Universal Credit, and support for families with children.',
    breakdown: [
      { name: 'State Pensions', amount: 138.2, description: 'Basic and new State Pension payments to ~12.7 million UK pensioners, protected by the Triple Lock.' },
      { name: 'Universal Credit & Working-Age Support', amount: 88.4, description: 'Means-tested income and housing support for low-income and unemployed individuals and households.' },
      { name: 'Disability & Incapacity Benefits (PIP, DLA, ESA)', amount: 43.2, description: 'Personal Independence Payment, Attendance Allowance, and disability living allowances for chronic health conditions.' },
      { name: 'Child Benefit & Family Allowances', amount: 28.5, description: 'Universal child benefits, nursery credits, and carer allowances supporting carers and dependents.' },
      { name: 'Other Social Security & Winter Fuel', amount: 18.2, description: 'Local welfare grants, pension credit top-ups, funeral expenses, and seasonal support payments.' }
    ],
    keyFacts: [
      'The single largest item in the UK Budget, accounting for over 25p in every pound spent.',
      'State Pension is the largest single component at £138.2bn, rising rapidly due to demographic aging.',
      'Classified almost entirely as AME (Annually Managed Expenditure), meaning funding rises automatically with claimant eligibility.'
    ]
  },
  {
    id: 'health',
    name: 'Health & Social Care (NHS)',
    category: 'Public Services',
    amount: 211.4,
    percentage: 17.2,
    perCapita: 3100,
    delVsAme: 'DEL',
    icon: 'HeartPulse',
    color: '#06b6d4', // cyan
    description: 'National Health Service operations across England, Scotland, Wales, and Northern Ireland, alongside adult social care subsidies.',
    breakdown: [
      { name: 'NHS Hospitals & Acute Healthcare', amount: 135.2, description: 'Staff salaries (doctors, nurses, specialists), elective surgeries, emergency care, and hospital operations.' },
      { name: 'General Practice & Primary Care', amount: 18.6, description: 'GP surgeries, community nursing, family doctors, and urgent primary diagnostic clinics.' },
      { name: 'Prescription Medicines & Clinical Supplies', amount: 19.4, description: 'NICE-approved pharmaceutical treatments, vaccines, cancer therapies, and medical devices.' },
      { name: 'Adult Social Care Grants & Support', amount: 18.2, description: 'Central grants to local authorities for residential care homes, elderly assistance, and dementia care.' },
      { name: 'Capital Infrastructure & Technology', amount: 20.0, description: 'Hospital building programmes, diagnostic hubs, surgical robots, MRI/CT scanners, and digital systems.' }
    ],
    keyFacts: [
      'NHS employs over 1.4 million people in England alone, making it one of the world’s largest employers.',
      'Healthcare spending has expanded from ~5% of GDP in the 1990s to ~8% of GDP today.',
      'Every UK resident receives on average £3,100 of annual healthcare funding via taxation.'
    ]
  },
  {
    id: 'debt-interest',
    name: 'Public Debt Interest',
    category: 'Financing',
    amount: 102.3,
    percentage: 8.3,
    perCapita: 1500,
    delVsAme: 'AME',
    icon: 'Landmark',
    color: '#ef4444', // red
    description: 'Coupons and interest payments made by the Treasury to holders of UK Government Gilts (bonds) and index-linked liabilities.',
    breakdown: [
      { name: 'Conventional Gilt Coupon Payments', amount: 64.5, description: 'Fixed coupon yields paid bi-annually on standard sovereign UK bonds held by pension funds, banks, and foreign institutions.' },
      { name: 'Index-Linked Gilt Inflation Uplifts', amount: 28.6, description: 'Principal and interest uplifts on inflation-linked debt tied to RPI; highly sensitive to inflation rate movements.' },
      { name: 'Bank of England APF Interest Settlement', amount: 9.2, description: 'Treasury indemnities on Asset Purchase Facility reserves held at Bank Rate.' }
    ],
    keyFacts: [
      'Now the 3rd largest spending category—costing more than Defence, Police, and Transport combined.',
      'Around 25% of UK sovereign debt is index-linked (the highest proportion among G7 nations), exposing public finances directly to inflation spikes.',
      'Does not buy a single hospital bed, school, or military vehicle; it is purely the cost of past borrowing.'
    ]
  },
  {
    id: 'education',
    name: 'Education & Skills',
    category: 'Public Services',
    amount: 91.8,
    percentage: 7.5,
    perCapita: 1346,
    delVsAme: 'DEL',
    icon: 'GraduationCap',
    color: '#8b5cf6', // purple
    description: 'Funding for state primary and secondary schools, 16-19 sixth form colleges, apprenticeships, and university student finance subsidy.',
    breakdown: [
      { name: 'Primary & Secondary State Schools', amount: 59.4, description: 'Dedicated Schools Grant (DSG), teacher salaries, classroom materials, and academy trust budgets.' },
      { name: 'Higher Education & Student Loan Subsidies', amount: 15.8, description: 'Resource accounting write-offs for income-contingent university student loans and research funding.' },
      { name: 'Early Years & Childcare Entitlements', amount: 8.4, description: 'State-funded 15 and 30-hour childcare allowances for eligible working parents of young children.' },
      { name: 'Further Education Colleges & Skills', amount: 8.2, description: 'T-levels, vocational training, apprenticeships, and adult education budget.' }
    ],
    keyFacts: [
      'Over 9 million pupils attend more than 24,000 state-funded schools in England.',
      'Per-pupil funding in English schools is approximately £7,690 per academic year.',
      'Student loan write-downs represent non-cash accounting adjustments when graduates are not expected to repay in full before 40 years.'
    ]
  },
  {
    id: 'defence',
    name: 'Defence & National Security',
    category: 'Public Services',
    amount: 54.2,
    percentage: 4.4,
    perCapita: 795,
    delVsAme: 'DEL',
    icon: 'ShieldAlert',
    color: '#10b981', // emerald
    description: 'The Royal Navy, British Army, Royal Air Force, continuous at-sea nuclear deterrent (Trident), and defense equipment procurement.',
    breakdown: [
      { name: 'Equipment Procurement & Modernisation', amount: 21.6, description: 'Next-gen fighter jets (GCAP/Tempest), Dreadnought submarines, Ajax armoured vehicles, and ammunition stocks.' },
      { name: 'Armed Forces Personnel & Pensions', amount: 16.1, description: 'Pay, allowances, healthcare, and military pension schemes for ~140,000 regular service personnel and reservists.' },
      { name: 'Military Operations & Base Estate', amount: 16.5, description: 'Bases across the UK, overseas garrisons (Cyprus, Falklands), training exercises, logistics, and NATO missions.' }
    ],
    keyFacts: [
      'The UK spends approximately 2.3% of GDP on defence, exceeding the NATO 2.0% guideline.',
      'The UK maintains a minimum continuous at-sea nuclear deterrent with Vanguard-class ballistic missile submarines.',
      'Political debate currently focuses on pathways to increase defence expenditure to 2.5% of GDP.'
    ]
  },
  {
    id: 'public-order',
    name: 'Public Order & Safety (Police & Justice)',
    category: 'Public Services',
    amount: 42.1,
    percentage: 3.4,
    perCapita: 617,
    delVsAme: 'DEL',
    icon: 'Scale',
    color: '#f59e0b', // amber
    description: 'Territorial police forces across the UK, HM Prison & Probation Service, Crown Courts, magistrates, and border enforcement.',
    breakdown: [
      { name: 'Police Forces & Special Operations', amount: 21.4, description: '43 territorial police forces in England & Wales, Police Scotland, PSNI, National Crime Agency, and counter-terrorism.' },
      { name: 'Prisons & Probation Service', amount: 7.8, description: 'Operation and security of 120+ adult prisons, youth custody facilities, and rehabilitation probation services.' },
      { name: 'HM Courts, Tribunals & Legal Aid', amount: 5.7, description: 'Court administration, judiciary pay, criminal justice processing, and means-tested civil & criminal legal aid.' },
      { name: 'Border Force & Immigration Enforcement', amount: 7.2, description: 'Port security, passport control, immigration tribunals, asylum processing, and accommodation systems.' }
    ],
    keyFacts: [
      'There are over 147,000 police officers across England and Wales.',
      'UK prison population stands near record levels (~88,000), prompting significant capacity management pressures.'
    ]
  },
  {
    id: 'transport',
    name: 'Transport Infrastructure',
    category: 'Infrastructure',
    amount: 41.5,
    percentage: 3.4,
    perCapita: 608,
    delVsAme: 'DEL',
    icon: 'Train',
    color: '#14b8a6', // teal
    description: 'National and regional rail systems, motorway maintenance, strategic high-speed rail, bus service subsidies, and local active travel.',
    breakdown: [
      { name: 'Network Rail & Passenger Rail Services', amount: 22.3, description: 'Track maintenance, signalling, train operating contracts, and High Speed 2 (HS2) London-Birmingham construction.' },
      { name: 'Strategic Roads & National Highways', amount: 10.8, description: 'Motorway widening, pothole funds, resurfacing, smart motorways, and bridge structural inspections.' },
      { name: 'Local Transport & Bus Subsidies', amount: 8.4, description: '£2 bus fare cap subsidies, Transport for London (TfL) capital settlements, cycling corridors, and light rail.' }
    ],
    keyFacts: [
      'Over 1.6 billion passenger journeys are made annually on the UK rail network.',
      'High Speed 2 (Phase 1) is Europe’s largest single infrastructure engineering project.'
    ]
  },
  {
    id: 'economic-affairs',
    name: 'Science, Innovation & Economy',
    category: 'Economy',
    amount: 34.2,
    percentage: 2.8,
    perCapita: 501,
    delVsAme: 'Mixed',
    icon: 'Cpu',
    color: '#ec4899', // pink
    description: 'Scientific research councils (UKRI), artificial intelligence supercomputing, aerospace, clean tech innovation, and business loans.',
    breakdown: [
      { name: 'Scientific Research & UKRI Councils', amount: 14.6, description: 'Grants to universities, laboratories (Crick Institute, Harwell), quantum computing, and biomedical research.' },
      { name: 'Clean Energy & Green Transition Subsidies', amount: 10.2, description: 'Contracts for Difference (CfD) offshore wind support, carbon capture hubs, and nuclear power development.' },
      { name: 'British Business Bank & Regional Growth', amount: 9.4, description: 'Start-up loans, Levelling Up / local enterprise funds, and industrial aerospace/automotive development.' }
    ],
    keyFacts: [
      'The UK ranks 4th globally in the Global Innovation Index.',
      'The government aims to position the UK as a global hub for Artificial Intelligence and life sciences.'
    ]
  },
  {
    id: 'general-public-services',
    name: 'General Public Services & Administration',
    category: 'Administration',
    amount: 32.6,
    percentage: 2.7,
    perCapita: 478,
    delVsAme: 'DEL',
    icon: 'Building2',
    color: '#64748b', // slate
    description: 'Civil service administration, tax collection operations at HMRC, UK Parliament, statistics (ONS), and devolved block grants adjustments.',
    breakdown: [
      { name: 'HMRC & Revenue Administration', amount: 6.8, description: 'Tax collection digital infrastructure, compliance investigations, customer contact centres, and customs IT systems.' },
      { name: 'Central Whitehall & Cabinet Office', amount: 7.4, description: 'Core policy coordination, civil service procurement, cybersecurity, and national archive operations.' },
      { name: 'Devolved Governments Grant Baselines', amount: 14.2, description: 'Barnett formula baseline administration and cross-border public service standardizations.' },
      { name: 'Parliament, Audit & Statistics', amount: 4.2, description: 'House of Commons & Lords, National Audit Office (NAO), Electoral Commission, and Office for National Statistics.' }
    ],
    keyFacts: [
      'HMRC processes over £1.1 trillion in tax revenues with an operational budget of around £6.8bn (efficiency of under 0.6%).'
    ]
  },
  {
    id: 'housing-communities',
    name: 'Housing & Local Government',
    category: 'Infrastructure',
    amount: 19.8,
    percentage: 1.6,
    perCapita: 290,
    delVsAme: 'DEL',
    icon: 'Home',
    color: '#ea580c', // orange
    description: 'Affordable Homes Programme, cladding and building safety remediation, homelessness prevention, and local council grants.',
    breakdown: [
      { name: 'Affordable Homes & Social Housing Grants', amount: 6.8, description: 'Capital grants to housing associations and local councils to build social rent and shared ownership homes.' },
      { name: 'Local Authority Support Grants', amount: 8.4, description: 'Revenue Support Grant and discretionary funds for local services like libraries, waste, and parks.' },
      { name: 'Building Safety & Cladding Remediation', amount: 4.6, description: 'Replacing unsafe cladding on high-rise residential buildings following the Grenfell tragedy.' }
    ],
    keyFacts: [
      'England has a target of building 300,000+ new homes each year to ease structural housing shortages.',
      'Building safety remediation is partially funded through the Residential Property Developer Tax.'
    ]
  },
  {
    id: 'international-development',
    name: 'International Aid & Foreign Office (FCDO)',
    category: 'Foreign Affairs',
    amount: 14.2,
    percentage: 1.2,
    perCapita: 208,
    delVsAme: 'DEL',
    icon: 'Globe',
    color: '#0284c7', // light blue
    description: 'Official Development Assistance (ODA), humanitarian disaster relief, global disease eradication, and the diplomatic embassy network.',
    breakdown: [
      { name: 'Overseas Humanitarian Aid & Global Health', amount: 7.8, description: 'Vaccine alliances (Gavi), emergency food relief in crisis zones, clean water projects, and refugee aid abroad.' },
      { name: 'Diplomatic Missions & FCDO Network', amount: 3.8, description: 'Embassies, high commissions, consulates across 170+ countries, and multilateral treaty bodies.' },
      { name: 'In-Donor Refugee Support Costs', amount: 2.6, description: 'First-year housing and welfare costs for eligible asylum seekers and refugees accommodated within the UK.' }
    ],
    keyFacts: [
      'UK ODA spending is set at 0.5% of Gross National Income (GNI), with a legislated ambition to return to 0.7% when fiscal conditions allow.'
    ]
  },
  {
    id: 'environment-rural',
    name: 'Environment, Food & Rural Affairs (DEFRA)',
    category: 'Environment',
    amount: 8.4,
    percentage: 0.7,
    perCapita: 123,
    delVsAme: 'DEL',
    icon: 'Trees',
    color: '#16a34a', // green
    description: 'River and coastal flood defences, post-Brexit Environmental Land Management (ELMS) farm subsidies, and forestry.',
    breakdown: [
      { name: 'Farm Stewardship & Land Management', amount: 3.8, description: 'ELMS subsidies replacing the EU Common Agricultural Policy, rewarding biodiversity, tree planting, and soil health.' },
      { name: 'Flood & Coastal Erosion Risk Management', amount: 3.1, description: 'Construction and maintenance of sea walls, Thames Barrier operations, and river catchment defenses.' },
      { name: 'Environmental Protection & Waste Regulation', amount: 1.5, description: 'Environment Agency inspections, water pollution monitoring, national park conservation, and veterinary services.' }
    ],
    keyFacts: [
      'The Environment Agency protects over 300,000 properties with modern flood alleviation schemes.',
      'Post-Brexit agricultural policy now pays farmers for "public goods" rather than simply acreage owned.'
    ]
  },
  {
    id: 'reserves-other',
    name: 'Reserves, EU Settlement & Contingencies',
    category: 'Contingencies',
    amount: 67.4,
    percentage: 5.5,
    perCapita: 988,
    delVsAme: 'AME',
    icon: 'HelpCircle',
    color: '#94a3b8',
    description: 'Special reserve funds, unforeseen emergencies, capital depreciation write-offs, and residual EU financial settlement commitments.',
    breakdown: [
      { name: 'Treasury Special Contingency Reserve', amount: 15.2, description: 'Unallocated reserve for unexpected in-year geopolitical or economic shocks.' },
      { name: 'Depreciation & Capital Asset Adjustments', amount: 44.2, description: 'Non-cash accounting charges for wear-and-tear of public buildings, military equipment, and road networks.' },
      { name: 'EU Withdrawal Financial Settlement Tail', amount: 8.0, description: 'Agreed staged pension and liabilities transfers from UK exit agreements (winding down over time).' }
    ],
    keyFacts: [
      'Significant portion reflects non-cash capital depreciation required by international national accounting standards.'
    ]
  }
];

export const UK_REVENUE_DATA: RevenueItem[] = [
  {
    id: 'income-tax',
    name: 'Income Tax',
    category: 'Direct Taxes',
    amount: 276.4,
    percentage: 24.3,
    color: '#3b82f6',
    description: 'Direct tax on earned employment income, pensions, rental profits, and investment earnings above the Personal Allowance.',
    details: 'Standard Personal Allowance is £12,570 (frozen). Basic Rate 20% (£12,571–£50,270), Higher Rate 40% (£50,271–£125,140), Additional Rate 45% (>£125,140).'
  },
  {
    id: 'nics',
    name: 'National Insurance Contributions (NICs)',
    category: 'Direct Taxes',
    amount: 168.2,
    percentage: 14.8,
    color: '#6366f1',
    description: 'Contributions paid by employees, employers, and self-employed individuals, hypothecated towards the National Insurance Fund and NHS.',
    details: 'Employee main rate is 8% (lowered from 12%), while Employer NICs are 15% on earnings above the secondary threshold (£5,000).'
  },
  {
    id: 'vat',
    name: 'Value Added Tax (VAT)',
    category: 'Indirect Taxes',
    amount: 172.5,
    percentage: 15.1,
    color: '#06b6d4',
    description: 'Consumption tax levied on most goods and services sold by businesses within the United Kingdom.',
    details: 'Standard rate 20%, reduced rate 5% (domestic energy), and zero rate (most staple food items, books, children’s clothing, prescriptions).'
  },
  {
    id: 'corporation-tax',
    name: 'Corporation Tax',
    category: 'Capital & Business Taxes',
    amount: 96.8,
    percentage: 8.5,
    color: '#8b5cf6',
    description: 'Tax on taxable profits made by UK resident companies and multinational branch offices.',
    details: 'Main rate is 25% on profits exceeding £250,000, with a 19% small profits rate for companies earning under £50,000 (marginal relief in between).'
  },
  {
    id: 'council-tax',
    name: 'Council Tax (Local Authorities)',
    category: 'Direct Taxes',
    amount: 44.2,
    percentage: 3.9,
    color: '#10b981',
    description: 'Local tax on domestic properties collected by local authorities to fund social care, policing, waste collection, and local services.',
    details: 'Banded based on 1991 property valuations (Bands A through H in England). Average Band D council tax exceeds £2,100 per annum.'
  },
  {
    id: 'business-rates',
    name: 'Business Rates (Non-Domestic)',
    category: 'Capital & Business Taxes',
    amount: 28.6,
    percentage: 2.5,
    color: '#d97706',
    description: 'Tax on commercial and non-domestic properties (shops, offices, warehouses, factories) based on rateable value.',
    details: 'Multipliers set centrally by national government, with relief for small businesses and high street retail/hospitality.'
  },
  {
    id: 'fuel-duty',
    name: 'Fuel Duties',
    category: 'Duties & Levies',
    amount: 24.7,
    percentage: 2.2,
    color: '#f97316',
    description: 'Excise duty on petrol, diesel, and other road vehicle fuels.',
    details: 'Frozen at 52.95p per litre since 2011 (including the temporary 5p cut). Contributes ~£25bn but projected to decline as electric vehicles adopt.'
  },
  {
    id: 'tobacco-alcohol',
    name: 'Tobacco & Alcohol Duties',
    category: 'Duties & Levies',
    amount: 21.2,
    percentage: 1.9,
    color: '#ec4899',
    description: 'Sin taxes levied on cigarettes, vaping, beer, cider, wine, and spirits to discourage consumption and cover health externalities.',
    details: 'Reformed in 2023 so alcoholic drinks are taxed according to alcohol-by-volume (ABV) strength.'
  },
  {
    id: 'cgt',
    name: 'Capital Gains Tax (CGT)',
    category: 'Capital & Business Taxes',
    amount: 16.5,
    percentage: 1.4,
    color: '#14b8a6',
    description: 'Tax paid on the gain/profit made when disposing of an asset (second homes, shares, artwork, business stakes).',
    details: 'Annual tax-free allowance is £3,000. Basic rate 18%, higher rate 24% for assets and residential property.'
  },
  {
    id: 'stamp-duty',
    name: 'Stamp Duty Land Tax (SDLT)',
    category: 'Capital & Business Taxes',
    amount: 13.8,
    percentage: 1.2,
    color: '#84cc16',
    description: 'Transaction tax paid by purchasers of residential and non-residential land and property in England & Northern Ireland.',
    details: 'Progressive tiers starting above £250,000 (first-time buyers enjoy relief up to £425,000).'
  },
  {
    id: 'iht',
    name: 'Inheritance Tax (IHT)',
    category: 'Capital & Business Taxes',
    amount: 7.8,
    percentage: 0.7,
    color: '#a855f7',
    description: 'Tax paid on the net value of an estate (property, money, possessions) passed on upon death.',
    details: 'Nil-rate band of £325,000 plus £175,000 residence nil-rate band (transferable to spouses). Charged at 40% on amount above threshold.'
  },
  {
    id: 'vehicle-excise',
    name: 'Vehicle Excise Duty (VED)',
    category: 'Duties & Levies',
    amount: 7.9,
    percentage: 0.7,
    color: '#0ea5e9',
    description: 'Annual road tax for motor vehicles registered in the UK, based on CO2 emissions or flat standard rate.',
    details: 'Standard annual rate £190 for petrol/diesel vehicles, with electric vehicles scheduled to begin paying VED from 2025 onwards.'
  },
  {
    id: 'other-taxes',
    name: 'Environmental Levies, Customs & Air Passenger Duty',
    category: 'Duties & Levies',
    amount: 22.2,
    percentage: 1.9,
    color: '#22c55e',
    description: 'Air Passenger Duty (flights departing UK), Climate Change Levy, Landfill Tax, Plastic Packaging Tax, and Import Tariffs.',
    details: 'Designed to incentivize decarbonization and fund airport/customs border surveillance.'
  },
  {
    id: 'non-tax-revenue',
    name: 'Non-Tax Receipts & Public Corporation Trading',
    category: 'Other',
    amount: 65.0,
    percentage: 5.7,
    color: '#64748b',
    description: 'Interest and dividends earned on government assets, student loan interest, central bank operations, and fees for statutory services.',
    details: 'Includes DVLA fees, Passport Office fees, Land Registry fees, and Crown Estate net revenues surrendered to the Treasury.'
  },
  {
    id: 'borrowing-shortfall',
    name: 'Net Borrowing (Deficit Financing)',
    category: 'Other',
    amount: 87.2,
    percentage: 7.1, // of spending
    color: '#ef4444',
    description: 'The gap between government revenue and expenditure, financed by issuing new HM Treasury gilts in financial markets.',
    details: 'Represents Public Sector Net Borrowing (PSNB). Added to the cumulative national debt stock every year.'
  }
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

export function calculatePersonalTax(grossIncome: number) {
  // Income tax calculation (including taper above £100,000)
  let allowance = 12570;
  if (grossIncome > 100000) {
    const reduction = Math.min(12570, (grossIncome - 100000) / 2);
    allowance = Math.max(0, 12570 - reduction);
  }

  let taxableIncome = Math.max(0, grossIncome - allowance);
  let incomeTax = 0;

  // Basic rate band: up to £50,270 gross (or taxable up to £37,700)
  const basicBandWidth = 50270 - 12570;
  const basicTaxable = Math.min(taxableIncome, basicBandWidth);
  incomeTax += basicTaxable * 0.20;

  // Higher rate band: £50,270 to £125,140
  if (grossIncome > 50270) {
    const higherTaxable = Math.min(
      Math.max(0, grossIncome - 50270),
      125140 - 50270
    );
    incomeTax += higherTaxable * 0.40;
  }

  // Additional rate: above £125,140
  if (grossIncome > 125140) {
    const additionalTaxable = grossIncome - 125140;
    incomeTax += additionalTaxable * 0.45;
  }

  // Employee Class 1 National Insurance:
  // £0 to £12,570: 0%
  // £12,570 to £50,270: 8%
  // Above £50,270: 2%
  let nic = 0;
  if (grossIncome > 12570) {
    const nicMain = Math.min(grossIncome, 50270) - 12570;
    nic += nicMain * 0.08;
  }
  if (grossIncome > 50270) {
    const nicUpper = grossIncome - 50270;
    nic += nicUpper * 0.02;
  }

  const totalDirectTax = incomeTax + nic;
  const netTakeHome = grossIncome - totalDirectTax;
  const effectiveRate = grossIncome > 0 ? (totalDirectTax / grossIncome) * 100 : 0;

  // Apportion where each £ of their direct tax goes
  // Based on UK_SPENDING_DATA proportions
  const totalSpending = UK_FISCAL_TOTALS.totalSpending;
  const taxDistribution = UK_SPENDING_DATA.map(item => {
    const shareOfSpending = item.amount / totalSpending;
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
        amount: personalContribution * (b.amount / item.amount)
      }))
    };
  });

  return {
    grossIncome,
    personalAllowance: allowance,
    incomeTax,
    nic,
    totalDirectTax,
    netTakeHome,
    effectiveRate,
    taxDistribution
  };
}


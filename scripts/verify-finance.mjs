import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync('src/data/ukBudgetData.ts', 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
}).outputText;
const sandbox = { exports: {}, console };
vm.runInNewContext(output, sandbox, { timeout: 5000 });
const {
  UK_FISCAL_TOTALS, UK_SPENDING_DATA, UK_REVENUE_DATA, HMRC_REVENUE_TOTAL_2024_25, DEBT_INTEREST_METRICS,
  UK_HISTORICAL_DATA, YEARLY_SPENDING_SPLITS, calculatePersonalTax
} = sandbox.exports;

const close = (actual, expected, tolerance=0.001) =>
  assert.ok(Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance,
    'Expected ' + actual + ' to be within ' + tolerance + ' of ' + expected);

close(UK_FISCAL_TOTALS.totalSpending, 1290.348);
close(UK_FISCAL_TOTALS.totalReceipts, 1140.539);
close(UK_FISCAL_TOTALS.netBorrowing, 149.809);
close(UK_FISCAL_TOTALS.totalSpending - UK_FISCAL_TOTALS.totalReceipts, UK_FISCAL_TOTALS.netBorrowing);
close(UK_FISCAL_TOTALS.netDebt, 2806.699);
close(UK_FISCAL_TOTALS.population, 69.2563);
close(UK_FISCAL_TOTALS.taxPayingAdults, 38.6);
close(DEBT_INTEREST_METRICS.annualAmount, 123853926000);
close(DEBT_INTEREST_METRICS.perSecond, DEBT_INTEREST_METRICS.annualAmount / 31536000, 0.00001);

assert.equal(UK_REVENUE_DATA.length, 7, 'Exactly seven HMRC tax groups');
close(HMRC_REVENUE_TOTAL_2024_25, 875.9);
close(UK_REVENUE_DATA.reduce((a,b)=>a+b.amount,0),HMRC_REVENUE_TOTAL_2024_25);
close(UK_REVENUE_DATA.find(x=>x.id === 'income-tax').amount,309.4);
close(UK_REVENUE_DATA.find(x=>x.id === 'nics').amount,168.8);
close(UK_REVENUE_DATA.find(x=>x.id === 'vat').amount,178.5);
close(UK_REVENUE_DATA.find(x=>x.id === 'corporation-tax').amount,89.6);
assert.ok(!UK_REVENUE_DATA.some(x=>x.id === 'borrowing-shortfall'),
  'Borrowing is NOT HMRC tax revenue');
assert.equal(UK_HISTORICAL_DATA.length,13,'Historical chart must show 13 independently checked ONS fiscal periods');
close(UK_HISTORICAL_DATA[0].borrowing,-16.305);
close(UK_HISTORICAL_DATA[UK_HISTORICAL_DATA.length-1].debtAmount,2916.811);
for(const row of UK_HISTORICAL_DATA){
  close(row.spending - row.receipts,row.borrowing);
}
assert.ok(UK_SPENDING_DATA.some(x=>x.name==='Social protection'),'Official spending category exists');
assert.equal(YEARLY_SPENDING_SPLITS.length,15,'Treasury Table 9 covers every year 2010/11–2024/25');
for(const row of YEARLY_SPENDING_SPLITS){
  close(row.welfare+row.health+row.debtInterest+row.education+row.defence+row.otherServices,row.totalSpending,0.00001);
}
close(YEARLY_SPENDING_SPLITS[0].totalSpending,675.3);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].totalSpending,1166.3);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].welfare,387.2);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].health,242.4);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].debtInterest,126.5);
assert.equal(UK_SPENDING_DATA.length, 10, 'Exactly ten official COFOG functional categories');
close(UK_SPENDING_DATA.reduce((a,b)=>a+b.amount,0),1167.6);
assert.ok(UK_SPENDING_DATA.every(x=>x.delVsAme==='Mixed'),
  'COFOG and budget control DEL/AME must not be misrepresented as equivalent');
assert.ok(UK_SPENDING_DATA.every(x=>x.breakdown.length===0),
  'No invented departmental or programme sub-allocations');
const history = UK_HISTORICAL_DATA.find(x=>x.year==='2024/25');
close(history.borrowing, 149.809);
close(history.debtAmount, 2806.699);

const cases = [
  [0,0,0],
  [12570,0,0],
  [50000,7486,2994.4],
  [60000,11432,3210.6],
  [110000,33432,4210.6],
  [150000,53703,5010.6],
];
for (const [income,tax,ni] of cases){
  const r=calculatePersonalTax(income,'england-wales-ni');
  close(r.incomeTax,tax);
  close(r.nic,ni);
  close(r.totalDirectTax,r.incomeTax+r.nic);
  close(r.taxDistribution.reduce((a,x)=>a+x.amount,0),r.totalDirectTax);
}
const scottish=calculatePersonalTax(50000,'scotland');
close(scottish.incomeTax, 8982.05);
assert.ok(scottish.incomeTax > calculatePersonalTax(50000).incomeTax);
console.log('PASS: ONS/OBR/HMT/HMRC reconciliations, 15 annual Treasury category splits, historical outturns, demographics and PAYE/NI tests.');

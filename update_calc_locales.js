const fs = require('fs');
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

en.CalculatorPage = {
  "hero": {
    "title": "Solar Savings Calculator",
    "subtitle": "Estimate your potential savings and system size in seconds."
  },
  "form": {
    "billLabel": "Average Monthly Electric Bill",
    "exposureLabel": "Roof Sun Exposure",
    "exposure": {
      "high": "High",
      "medium": "Medium",
      "low": "Low"
    },
    "roofTypeLabel": "Roof Type",
    "roofType": {
      "flat": "Flat",
      "sloped": "Sloped"
    }
  },
  "results": {
    "title": "Your Estimated Savings",
    "systemSize": "Recommended System Size",
    "monthlySavings": "Est. Monthly Savings",
    "twentyYearSavings": "20-Year Savings",
    "payback": "Est. Payback Period",
    "years": "years",
    "chartTitle": "Estimated Cost Over 20 Years",
    "chartWithout": "Without Solar",
    "chartWith": "With Solar",
    "cta": "Get Formal Quote"
  }
};

fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));

function clearValues(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clearValues(obj[key]);
    } else {
      obj[key] = "";
    }
  }
}

const hi = JSON.parse(JSON.stringify(en));
clearValues(hi);
fs.writeFileSync('messages/hi.json', JSON.stringify(hi, null, 2));

const gu = JSON.parse(JSON.stringify(en));
clearValues(gu);
fs.writeFileSync('messages/gu.json', JSON.stringify(gu, null, 2));

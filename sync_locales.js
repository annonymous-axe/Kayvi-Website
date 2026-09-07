const fs = require('fs');
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));

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

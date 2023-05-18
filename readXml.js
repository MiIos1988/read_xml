const fs = require('fs');
const xml2js = require('xml2js');

const xml = fs.readFileSync('C:/Users/Client85a/Downloads/doc.xml', 'utf-8');

xml2js.parseString(xml, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  const name = result['ns1:PodaciPoreskeDeklaracije']['ns1:DeklarisaniPrihodi'][0]['ns1:PodaciOPrihodima']
    .map((income) => income['ns1:Ime'][0] + ' ' + income['ns1:Prezime'][0]);

  console.log(name);
});

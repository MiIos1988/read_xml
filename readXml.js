// const fs = require('fs');
// const parser = require('fast-xml-parser')

// const xmlData = fs.readFileSync('/home/milos/Downloads/file.xml', 'utf-8');

// const parser = new xml2js.Parser();
// parser.parseString(xmlData, (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // Dobijeni rezultat je JavaScript objekat koji sadrži XML strukturu
//     console.log(result['ns1:PodaciPoreskeDeklaracije'])
//   }
// });

const fs = require('fs');
const parser = require('fast-xml-parser');

// Putanja do XML dokumenta
const filePath = '/home/milos/Downloads/file.xml';

// Opcije parsiranja
const options = {
  attributeNamePrefix: '',
  ignoreAttributes: false,
  parseAttributeValue: true
};

// Pročitajte sadržaj XML dokumenta
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Greška prilikom čitanja XML dokumenta:', err);
    return;
  }

  // Parsirajte XML podatke
  const jsonObj = parser.parse(data, options);

  console.log(jsonObj); // Prikazuje parsirane XML podatke kao JavaScript objekat
});

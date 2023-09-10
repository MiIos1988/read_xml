const fs = require('fs');
const xml2js = require('xml2js');
const XlsxPopulate = require('xlsx-populate');

const xml = fs.readFileSync('C:/Users/Client85a/Downloads/doc.xml', 'utf-8');

xml2js.parseString(xml, (err, result) => {
  if (err) {
    console.error(err, "error");
    return; 
  }

  const data = result['ns1:PodaciPoreskeDeklaracije']['ns1:DeklarisaniPrihodi'][0]['ns1:PodaciOPrihodima']
    .map((income) => ({
      imeIPrezime: income['ns1:Ime'][0] + ' ' + income['ns1:Prezime'][0],
      SVP: income['ns1:SVP'],
      Bruto: income['ns1:Bruto'],
      OsnovicaPorez: income['ns1:OsnovicaPorez'],
      Porez: income['ns1:Porez'],
      OsnovicaDoprinosi: income['ns1:OsnovicaDoprinosi'],
      PIO: income['ns1:PIO'],
      ZDR: income['ns1:ZDR'],
      NEZ: income['ns1:NEZ'],
      PIOBen: income['ns1:PIOBen'],
    }));

  createExcelTable(data)
});

async function createExcelTable(data) {
  // Creating a new workbook
  const workbook = await XlsxPopulate.fromBlankAsync();

  // Sheet selection (table)
  const sheet = workbook.sheet(0);

  // Column expansion
  sheet.column(1).width(30);
  sheet.column(2).width(15);
  sheet.column(3).width(15);
  sheet.column(4).width(15);
  sheet.column(5).width(15);
  sheet.column(6).width(15);
  sheet.column(7).width(15);
  sheet.column(8).width(15);
  sheet.column(9).width(15);
  sheet.column(10).width(15);


  // Defining table headers
  const headerRow = sheet.row(1);
  headerRow.cell(1).value('Ime i prezime');
  headerRow.cell(2).value('SVP');
  headerRow.cell(3).value('Bruto');
  headerRow.cell(4).value('Osnovica porez');
  headerRow.cell(5).value('Porez');
  headerRow.cell(6).value('Osnovica doprinosa');
  headerRow.cell(7).value('PIO');
  headerRow.cell(8).value('ZDR');
  headerRow.cell(9).value('NEZ');
  headerRow.cell(10).value('PIO ben');

  // Data filling
  data.forEach((entry, index) => {
    const row = sheet.row(index + 2); // Index + 2 because the first type is the header
    row.cell(1).value(entry.imeIPrezime);
    row.cell(2).value(entry.SVP[0]);
    row.cell(3).value(entry.Bruto[0]);
    row.cell(4).value(entry.OsnovicaPorez[0]);
    row.cell(5).value(entry.Porez[0]);
    row.cell(6).value(entry.OsnovicaDoprinosi[0]);
    row.cell(7).value(entry.PIO[0]);
    row.cell(8).value(entry.ZDR[0]);
    row.cell(9).value(entry.NEZ[0]);
    row.cell(10).value(entry.PIOBen[0]);
  });

  // Recording the workbook to a file
  await workbook.toFileAsync('output.xlsx');
}
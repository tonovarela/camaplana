const { response } = require('express');
const { jsPDF } = require('jspdf')

const ImpresionController = (req, res = response) => {


  const esPortrait=true;
  const alto =90 ;
  const ancho = 61 ;

  const anchoPieza = 11;
  const altoPieza = 21;

  const medianilAncho=1;
  const medianilAlto=1;   

  const doc = new jsPDF(esPortrait?'portrait':'landscape', 'cm', [alto, ancho]);

  //A lo alto es landscape
  //A lo ancho es portrait
  const itemsAncho = Math.trunc(ancho / anchoPieza);  
  const itemsAlto = Math.trunc(alto / altoPieza);


  //set colocar x y Y label   
  doc.setFont('times', 'bold');
  doc.setFontSize(100);
  doc.text(5, alto / 2, `${alto} cm  -( ${itemsAlto} rows) `, null, 90);
  doc.text(ancho / 2, 5, `${ancho} cm  - (${itemsAncho} columns) `,{align:"center"});

  
  var piezas = itemsAncho*itemsAlto;
    
  var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
  doc.text(`${piezas} piezas `, pageWidth / 2, pageHeight  /2, {align: 'center'});


  doc.setDrawColor(98, 5, 100);


  let incrementadory = 0;
  let incrementadorx = 0;
  for (let i = 0; i <= (itemsAncho - 1); i++) {
    incrementadory = 0;
    incrementadorx += (medianilAncho/2);
    for (let j = 0; j <= (itemsAlto - 1); j++) {
      incrementadory += (medianilAlto/2);
      doc.rect((i * anchoPieza) + (incrementadorx), (j * altoPieza) + (incrementadory), anchoPieza, altoPieza);
    }
  }

  const pdf = doc.output();
  res.contentType("application/pdf");
  res.end(pdf)
}

module.exports = {
  ImpresionController
}
const { response } = require('express');
const { jsPDF } = require('jspdf')

const ImpresionRigido = (req, res = response) => {
  const enAncho = false;
  const ancho = 90;
  const alto = 125;

  const medianilAncho = 1;
  const medianilAlto = 1;

  let anchoPieza = 3;
  let altoPieza = 3;

  const nMediaNilAncho = medianilAncho / 2;
  const nMediaNilAlto = medianilAlto / 2;

  anchoPieza = anchoPieza + medianilAncho;
  altoPieza = altoPieza + medianilAlto;
  if (!enAncho) {
    const t = anchoPieza;
    anchoPieza = altoPieza;
    altoPieza = t;
  }
  let orientation = "p";  
    if (alto < ancho) {
      orientation = "l";
    }

  const doc = new jsPDF(orientation, 'cm', [alto, ancho]);
  const itemsAncho = Math.trunc(ancho / anchoPieza);
  const itemsAlto = Math.trunc(alto / altoPieza);

  doc.setFont('times', 'bold');
  doc.setFontSize(75);
  doc.text(5, alto / 2, `${alto} cm  -( ${itemsAlto} renglones) `, {angle:90,align:"left"});
  doc.text(ancho/2, 5, `${ancho} cm  - (${itemsAncho} columnas) `,{align:"center"});

  var piezas = itemsAncho * itemsAlto;

  var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
  
  doc.text(`${piezas} items (${anchoPieza}cm x ${altoPieza} cm) `, pageWidth / 2, pageHeight / 2, { align: 'center' });

  doc.setDrawColor(98, 5, 100,);
  
  let incrementadory = 0;
  let incrementadorx = 0;
  for (let i = 0; i <= (itemsAncho - 1); i++) {
    incrementadory = 0;
    incrementadorx += nMediaNilAncho;
    for (let j = 0; j <= (itemsAlto - 1); j++) {
      incrementadory += (medianilAlto / 2);      
      doc.setLineWidth(0.01);
      doc.rect((i * (anchoPieza - nMediaNilAncho)) + (incrementadorx), (j * (altoPieza - nMediaNilAlto)) + (incrementadory), (anchoPieza - nMediaNilAncho), (altoPieza - nMediaNilAlto));
    }
  }
  const pdf = doc.output();
  res.contentType("application/pdf");
  res.end(pdf)
}

module.exports = {
  ImpresionRigido
}
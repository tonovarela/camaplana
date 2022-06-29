const { response } = require('express');
const { jsPDF } = require('jspdf')


const fs = require('fs');
const { merge } = require('merge-pdf-buffers');
var http = require('http');



const ImpresionRigido = () => {
  const enAncho = false;
  const ancho = 122;
  const alto = 244;

  const medianilAncho = 1;
  const medianilAlto = 1;

  let anchoPieza = 21.5;
  let altoPieza = 28;

  const nMediaNilAncho = (medianilAncho / 2);
  const nMediaNilAlto = (medianilAlto / 2);

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

  const scale=0.2;
  const doc = new jsPDF(orientation, 'cm', [alto*scale, ancho*scale]);
  const itemsAncho = Math.trunc(ancho / anchoPieza);
  const itemsAlto = Math.trunc(alto / altoPieza);

  doc.setFont('times', 'bold');
  doc.setFontSize(45);
  doc.text(5*scale, (alto*scale) / 2, `${alto} cm  -( ${itemsAlto} renglones) `, { angle: 90, align: "left" });
  doc.text((ancho *scale)/ 2, 5*scale, `${ancho} cm  - (${itemsAncho} columnas) `, { align: "center" });

  var piezas = itemsAncho * itemsAlto;
  var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.text(`${piezas} items (${anchoPieza}cm x ${altoPieza} cm) `, pageWidth / 2, pageHeight / 2, { align: 'center' });

  doc.setDrawColor(98, 5, 100,);

  let incrementadory = 0;
  let incrementadorx = 0;
  for (let i = 0; i <= (itemsAncho - 1); i++) {
    incrementadory = 0;
    incrementadorx += nMediaNilAncho*1;
    for (let j = 0; j <= (itemsAlto - 1); j++) {
      incrementadory += (medianilAlto / 2)*1;
      doc.setLineWidth(0.01);
      doc.rect(  (i * ( (anchoPieza*scale) - (nMediaNilAncho*scale))) + (incrementadorx*scale), (j * ((altoPieza*scale) - (nMediaNilAlto*scale))) + (incrementadory*scale), ((anchoPieza*scale) - (nMediaNilAncho*scale)), ((altoPieza*scale) - (nMediaNilAlto*scale)));
    }
  }
  const pdf = doc.output();
  return pdf;  
}

const ImpresionFlexible = () => {
  const enAncho = false;
  const alto = 110;
  const ancho = 152;

  const medianilAncho = 1;
  const medianilAlto = 1;

  let anchoPieza = 10;
  let altoPieza = 10;

  const nMediaNilAncho = medianilAncho / 2;
  const nMediaNilAlto = medianilAlto / 2;


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


  doc.setFont('times', 'bold');
  doc.setFontSize(75);
  doc.text(ancho / 2, 5, `${ancho} cm  - (${itemsAncho} columnas) `, { align: "center" });
  doc.text(5, alto / 2, `Material Flexible o Fotografico `, { angle: 90, align: "left" });
  doc.setDrawColor(98, 5, 100,);
  let incrementadorx = 0;
  for (let i = 0; i <= (itemsAncho - 1); i++) {
    incrementadorx += nMediaNilAncho;
    doc.rect((i * (anchoPieza - nMediaNilAncho)) + (incrementadorx), (alto - (altoPieza + 3)), (anchoPieza - nMediaNilAncho), (altoPieza - nMediaNilAlto));

  }
  const pdf = doc.output();
  return pdf;
  //res.contentType("application/pdf");

  //res.end(pdf)
}


const Imprimir = async(req, res = response) =>  {
  const respuesta =await httpGet("http://192.168.2.222/litoapps/cotizador/dompdf/cotizacion.php?foliob=49226")
  const rigido =ImpresionRigido();
  const buffer=Buffer.from(rigido,'binary');


//   fs.writeFile(`test.png`, rigido, err => { // Assets is a folder present in your root directory
//     if (err) {
//        console.log(err);
//     } else {
//        console.log('File created successfully!');
//     }
// }); 


  const merged = await merge([respuesta,buffer]);
  res.contentType("application/pdf");

  
  res.end(merged)


}


async function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url,   (response) => {
      const chunks = [];
      response.on('data', chunk => chunks.push(Buffer.from(chunk))) // Converte `chunk` to a `Buffer` object.
        .on('end', () => {
          const buffer = Buffer.concat(chunks);
          
          resolve(buffer
            //.toString('base64')
            )
       });
    });
  });
}

module.exports = {
  ImpresionRigido,
  ImpresionFlexible,
  Imprimir
}
const { response } = require('express');
const { jsPDF } = require('jspdf')
const { uid } = require('uid');
//const { merge } = require('merge-pdf-buffers');
var http = require('http');
const ImpresionRigido = ({ enAncho, ancho, alto }, { medianilAncho, medianilAlto, anchoPieza, altoPieza }) => {
  const _enAncho = enAncho;
  const _ancho = ancho;  //122;
  const _alto = alto//244;

  const _medianilAncho = medianilAncho;//1;
  const _medianilAlto = medianilAlto;//1;

  let _anchoPieza = anchoPieza// 21.5;
  let _altoPieza = altoPieza//28;

  const nMediaNilAncho = (_medianilAncho / 2);
  const nMediaNilAlto = (_medianilAlto / 2);
  _anchoPieza = _anchoPieza + _medianilAncho;
  _altoPieza = _altoPieza + _medianilAlto;
  if (!_enAncho) {
    const t = _anchoPieza;
    _anchoPieza = _altoPieza;
    _altoPieza = t;
  }
  let orientation = "p";
  if (_alto < _ancho) {
    orientation = "l";
  }

  const scale = 1;
  const doc = new jsPDF(orientation, 'cm', [_alto * scale, _ancho * scale]);
  const itemsAncho = Math.trunc(_ancho / _anchoPieza);
  const itemsAlto = Math.trunc(_alto / _altoPieza);

  doc.setFont('times', 'bold');
  doc.setFontSize(100);
  doc.text(5 * scale, (_alto * scale * 1.5) / 2, `${_alto} cm  -( ${itemsAlto} renglones) `, { angle: 90 });
  doc.text((_ancho * scale) / 2, 5 * scale, `${_ancho} cm  - (${itemsAncho} columnas) `, { align: "center" });

  var piezas = itemsAncho * itemsAlto;
  var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.text(`${piezas} items (${_anchoPieza}cm x ${_altoPieza} cm) `, pageWidth / 2, pageHeight / 2, { align: 'center' });

  doc.setDrawColor(98, 5, 100,);

  let incrementadory = 0;
  let incrementadorx = 0;
  for (let i = 0; i <= (itemsAncho - 1); i++) {
    incrementadory = 0;
    incrementadorx += nMediaNilAncho * 1;
    for (let j = 0; j <= (itemsAlto - 1); j++) {
      incrementadory += (_medianilAlto / 2) * 1;
      doc.setLineWidth(0.2);
      doc.rect((i * ((_anchoPieza * scale) - (nMediaNilAncho * scale))) + (incrementadorx * scale), (j * ((_altoPieza * scale) - (nMediaNilAlto * scale))) + (incrementadory * scale), ((_anchoPieza * scale) - (nMediaNilAncho * scale)), ((_altoPieza * scale) - (nMediaNilAlto * scale)));
    }
  }
  const nombreArchivo = `files/${uid(16)}.pdf`;
  doc.save(nombreArchivo);
  return nombreArchivo;

}

const ImpresionFlexible = ({ enAncho, ancho, alto }, { medianilAncho, medianilAlto, anchoPieza, altoPieza }) => {
  console.log({ anchoPieza, altoPieza })
  const _enAncho = enAncho;//false;
  const _alto = 80;
  const _ancho = ancho;

  const _medianilAncho = medianilAncho;
  const _medianilAlto = medianilAlto;

  let _anchoPieza = anchoPieza;
  let _altoPieza = altoPieza;

  const nMediaNilAncho = _medianilAncho / 2;
  const nMediaNilAlto = _medianilAlto / 2;


  if (!_enAncho) {
    const t = _anchoPieza;
    _anchoPieza = _altoPieza;
    _altoPieza = t;
  }
  let orientation = "p";
  if (_alto < _ancho) {
    orientation = "l";
  }

  const doc = new jsPDF(orientation, 'cm', [_alto, _ancho]);
  const itemsAncho = Math.trunc(_ancho / _anchoPieza);


  doc.setFont('times', 'bold');
  doc.setFontSize(100);
  doc.text(ancho / 2, 5, `${ancho} cm  - (${itemsAncho} columnas) `, { align: "center" });  
  doc.text(5, alto / 2, `Material Flexible o Fotografico `, { angle: 90, align: "left" });
  doc.setDrawColor(98, 5, 100,);
  let incrementadorx = 0;
  for (let i = 0; i <= (itemsAncho - 1); i++) {
    incrementadorx += nMediaNilAncho;
    doc.rect((i * (_anchoPieza - nMediaNilAncho)) + (incrementadorx), (_alto - (_altoPieza + 3)), (_anchoPieza - nMediaNilAncho), (_altoPieza - nMediaNilAlto));
  }
  const nombreArchivo = `files/${uid(16)}.pdf`;
  doc.save(nombreArchivo);
  return nombreArchivo;

}



function formatearInformacion(material) {
  const item = {
    anchoPieza: material.ANCHO,
    altoPieza: material.ALTO,
    medianilAncho: material.MEDIANIL_ANCHO,
    medianilAlto: material.MEDIANIL_ALTO
  }
  let ListaMateriales = [];
  if (material.ID_MATERIAL != 0) {
    ListaMateriales.push({
      esRigido: material.tipoMaterial == "R",
      descripcion: material.descripcionMaterial,
      enAncho: material.ORIENTA == "A lo ancho",
      ancho: material.MATANCHO,
      alto: material.MATALTO
    })
  }
  if (material.ID_MATERIAL2 != 0) {
    ListaMateriales.push({
      esRigido: material.tipoMaterial2 == "R",
      descripcion: material.descripcionMaterial2,
      enAncho: material.ORIENTA2 == "A lo ancho",
      ancho: material.MATANCHO2,
      alto: material.MATALTO2,

    })
  }
  if (material.ID_MATERIAL3 != 0) {
    ListaMateriales.push({
      esRigido: material.tipoMaterial3 == "R",
      descripcion: material.descripcionMaterial3,
      enAncho: material.ORIENTA3 == "A lo ancho",
      ancho: material.MATANCHO3,
      alto: material.MATALTO3,
    })
  }
  if (material.ID_MATERIAL4 != 0) {
    ListaMateriales.push({
      esRigido: material.tipoMaterial4 == "R",
      descripcion: material.descripcionMaterial4,
      enAncho: material.ORIENTA4 == "A lo ancho",
      ancho: material.MATANCHO4,
      alto: material.MATALTO4,

    })
  }
  return { item, ListaMateriales };
}


function removerArchivos() {
  const fs = require('fs');
  const path = require('path');
  const directory = 'files';

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

}


const Imprimir = async (req, res = response) => {
  const MaterialDAO = require("../DAO/Material");
  const materialDAO = new MaterialDAO();
  const [material] = await materialDAO.porID("49226");
  if (material == undefined) {
    return res.json({
      "mensaje": "No se encontro informacion de este folio"
    })
  }
  const { item, ListaMateriales } = formatearInformacion(material);
  //const respuestaBuffer =await httpGet("http://192.168.2.222/litoapps/cotizador/dompdf/cotizacion.php?foliob=49226")
  //Primero se verifica si es rigido o flexible para llamar a los diferentesModulos
  //const merged = await merge([respuestaBuffer,buffer]);
  const PDFImage = require("pdf-image").PDFImage;
  const PDFGenerator = require('pdfkit')
  let doc = new PDFGenerator();
  console.log(ListaMateriales);
  for (const _m of ListaMateriales) {
    let nombreArchivo = "";
    if (_m.esRigido) {
      nombreArchivo = ImpresionRigido(_m, item);
    } else {
      nombreArchivo = ImpresionFlexible(_m, item);
    }    
    let pdfImage = new PDFImage(nombreArchivo);
    const archivoImagen = await pdfImage.convertPage(0);    
    doc.text(`Material ${_m.descripcion}`);
    doc.image(archivoImagen, { fit: [250, 250] })
  }

  res.contentType("application/pdf");
  doc.pipe(res);
  doc.end()
  removerArchivos();
}


async function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      const chunks = [];
      response.on('data', chunk => chunks.push(Buffer.from(chunk))) // Converte `chunk` to a `Buffer` object.
        .on('end', () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer
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
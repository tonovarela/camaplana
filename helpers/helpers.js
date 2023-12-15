const http = require('http');
const PDFDocument = require('pdf-lib').PDFDocument;
const formatearInformacion = (material) => {
  const item = {
    anchoPieza: material.ANCHO,
    altoPieza: material.ALTO,
    medianilAncho: material.MEDIANIL_ANCHO,
    medianilAlto: material.MEDIANIL_ALTO,

  }
  const materialItem ={
    esRigido: material.tipoMaterial == "MATERIAL RIGIDO",    
    enAncho: material.ORIENTA == "A lo ancho",
    ancho: material.MATANCHO,
    alto: material.MATALTO
  }  
  return { item, materialItem };
}

const removerArchivos = () => {
  const fs = require('fs');
  const path = require('path');
  const directory = `${process.cwd()}/files`;;

  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

}

const httpGet = async (url) => {
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


const mergeFiles = async (cotizacionBuffer, materialesPDF) => {

  const mergedPdf = await PDFDocument.create();
  const pdfA = await PDFDocument.load(cotizacionBuffer.toString("base64"));
  const pdfB = await PDFDocument.load(materialesPDF.toString("base64"));
  const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
  copiedPagesA.forEach((page) => mergedPdf.addPage(page));
  const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
  copiedPagesB.forEach((page) => mergedPdf.addPage(page));
  const mergedPdfFile = await mergedPdf.save();
  return Buffer.from(mergedPdfFile.buffer);

}

module.exports = {
  removerArchivos,
  formatearInformacion,
  httpGet,
  mergeFiles
}
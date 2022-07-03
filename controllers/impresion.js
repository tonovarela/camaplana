const { response } = require('express');
const { merge } = require('merge-pdf-buffers');

const PDFImage = require("pdf-image").PDFImage;
const PDFGenerator = require('pdfkit')

const { ImpresionRigido } = require("../templates/Rigido");
const { ImpresionFlexible } = require("../templates/Flexible")
const { removerArchivos, formatearInformacion, httpGet } = require("../helpers/helpers")

const Imprimir = async (req, res = response) => {  
  //49226
  const folio = req.params.folio ;
  //const MaterialDAO = require("../DAO/Material");
  //const materialDAO = new MaterialDAO();
  //const [material] = await materialDAO.porID("49226");
  const material = {
    ID_MATERIAL: 31,
    ANCHO: 10,
    ALTO: 3,
    MEDIANIL_ANCHO: 1,
    MEDIANIL_ALTO: 1,
    descripcionMaterial: 'VINIL ESTATICO BLANCO',
    tipoMaterial: 'F',
    MEDIDA: 2,
    MATANCHO: 152,
    MATALTO: 10000,
    MATENTRAN: 13,
    ORIENTA: 'A lo ancho',
    ID_MATERIAL2: 145,
    descripcionMaterial2: 'COUCHE 250 GRS MTE ',
    tipoMaterial2: 'R',
    MEDIDA2: 3,
    MATANCHO2: 90,
    MATALTO2: 61,
    MATENTRAN2: 120,
    ORIENTA2: 'A lo ancho',
    ID_MATERIAL3: 147,
    descripcionMaterial3: 'COUCHE 300 GRS MTE ',
    tipoMaterial3: 'R',
    MEDIDA3: 3,
    MATANCHO3: 88,
    MATALTO3: 58,
    MATENTRAN3: 112,
    ORIENTA3: 'A lo ancho',
    ID_MATERIAL4: 0,
    descripcionMaterial4: 'Ninguno',
    tipoMaterial4: '',
    MEDIDA4: 0,
    MATANCHO4: 0,
    MATALTO4: 0,
    MATENTRAN4: 0,
    ORIENTA4: '0'
  }
  if (material == undefined) {
    return res.json({
      "mensaje": "No se encontro informacion de este folio"
    })
  }
  const { item, ListaMateriales } = formatearInformacion(material);
  const cotizacionBuffer = await httpGet("http://servicios.litoprocess.com/litoapps/cotizador/dompdf/cotizacion.php?foliob="+folio)

  res.contentType("application/pdf");   
  if (ListaMateriales.length==0){
    return res.send(cotizacionBuffer)
  }

  let pdf = new PDFGenerator();
  for (const _m of ListaMateriales) {
    let nombreArchivo = _m.esRigido ? ImpresionRigido(_m, item) : ImpresionFlexible(_m, item);
    let pdfImage = new PDFImage(nombreArchivo);
    try {
      const archivoImagen = await pdfImage.convertPage(0);
      pdf.text(`Material ${_m.descripcion}`);
      pdf.image(archivoImagen, { fit: [250, 250] }).moveDown(0.5);
    } catch (er) {
      console.log("Excepcion al crear la imagen del pdf");
    }
  }
  
  let buffers = [];
  pdf.on('data', buffers.push.bind(buffers))
  pdf.on('end', async () => {
    let materialesPDF = Buffer.concat(buffers);
    const mergedBuffer = await merge([cotizacionBuffer, materialesPDF]);
    res.send(mergedBuffer)
  })  
  pdf.end()
  removerArchivos();
}

module.exports = {
  Imprimir
}
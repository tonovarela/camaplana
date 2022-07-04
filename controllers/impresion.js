const { response } = require('express');


const PDFImage = require("pdf-image").PDFImage;
const PDFGenerator = require('pdfkit');
const { ImpresionRigido } = require("../templates/Rigido");
const { ImpresionFlexible } = require("../templates/Flexible")
const { removerArchivos, formatearInformacion, httpGet,mergeFiles } = require("../helpers/helpers")

const Imprimir = async (req, res = response) => {
  const folio = req.params.folio;
  const MaterialDAO = require("../DAO/Material");
  const materialDAO = new MaterialDAO();
  const [material] = await materialDAO.porID(folio);

  if (material == undefined) {
    return res.json({
      "mensaje": "No se encontro informacion de este folio"
    })
  }
  const { item, ListaMateriales } = formatearInformacion(material);
  const cotizacionBuffer = await httpGet("http://192.168.2.222/litoapps/cotizador/dompdf/cotizacion.php?foliob=" + folio)

  res.contentType("application/pdf");
  if (ListaMateriales.length == 0) {
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
    const  fileMerged=await mergeFiles(cotizacionBuffer,materialesPDF);    
    res.send(fileMerged);
  })
  pdf.end()
  removerArchivos();
}


module.exports = {
  Imprimir
}
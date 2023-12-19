const { response } = require('express');
const fsPromises = require('fs').promises;
const PDFImage = require("pdf-image").PDFImage;
const { ImpresionRigido } = require("../templates/Rigido");
const { ImpresionFlexible } = require("../templates/Flexible")
const MaterialDAO = require("../DAO/Material");
const { removerArchivos, formatearInformacion } = require("../helpers/helpers");

const Imprimir = async (req, res = response) => {
  const folio = req.params.folio;
  if (isNaN(+folio)) {
    return res.json({
      "mensaje": "No se encontro informacion de este folio"
    })
  }  
  const materialDAO = new MaterialDAO();
  const [material] = await materialDAO.porID(folio);
  if (material == undefined) {
    return res.json({
      "mensaje": "No se encontro informacion de este folio"
    })
  }
  const { item, materialItem } = formatearInformacion(material);  
  let nombreArchivo = materialItem.esRigido ? ImpresionRigido(materialItem, item) : ImpresionFlexible(materialItem, item);    
  let pdfImage = new PDFImage(nombreArchivo);
  try {
    const archivoImagen = await pdfImage.convertPage(0);
    const buffer= await fsPromises.readFile(archivoImagen);
    removerArchivos();
    res.writeHead(200, {"Content-Type": "image/png"});
    return res.end(buffer);
        
  } catch (er) {
    return res.json({
      "mensaje": "Excepcion al crear la imagen "
    })
  }
}

module.exports = {
  Imprimir
}
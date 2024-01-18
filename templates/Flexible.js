const { jsPDF } = require('jspdf');
const { uid } = require('uid');
const {imageScissors} = require('../img/scissors');


const ImpresionFlexible = ({ enAncho, ancho, alto }, { medianilAncho, medianilAlto, anchoPieza, altoPieza }) => {  
  
 
    const _enAncho = enAncho;//falseit 
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
    const itemsAncho = Math.trunc(_ancho / (_anchoPieza+_medianilAncho));


      
    doc.setFont('times', 'bold');
    doc.setFontSize(100);
    
    
    
    doc.text(ancho / 2, 5, `${ancho} cm  - (${(itemsAncho)} columnas) `, { align: "center" });
    doc.text(5, alto / 2, `Material Flexible o Fotografico `, { angle: 90, align: "left" });
    doc.addImage(imageScissors, 'PNG', ancho*0.05, 5, 0, 4);
    doc.addImage(imageScissors, 'PNG', (ancho*0.45), 5, 0, 4);
    doc.addImage(imageScissors, 'PNG', (ancho*0.9), 5, 0, 4);
    
    let incrementadorx = 0;
    
    for (let i = 0; i < (itemsAncho ); i++) {
      incrementadorx += nMediaNilAncho;
      doc.rect((i * (_anchoPieza - nMediaNilAncho)) + (incrementadorx), (_alto - (_altoPieza + 3)), (_anchoPieza - nMediaNilAncho), (_altoPieza - nMediaNilAlto));
    }
    doc.setLineDash([1, 1], 0);    
    doc.line(0, 7.1, doc.internal.pageSize.width ,7.1);
    const nombreArchivo = `${process.cwd()}/files/${uid(16)}Rigido.pdf`;    
    
    doc.save(nombreArchivo);
    return nombreArchivo;
  
  }







  
  module.exports = {
    ImpresionFlexible
  }
const { jsPDF } = require('jspdf');
const { uid } = require('uid');
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
    //doc.setDrawColor(98, 5, 100,);
    doc.rect(0, 0, doc.internal.pageSize.width , doc.internal.pageSize.height , 'S');
    doc.setFont('times', 'bold');
    doc.setFontSize(100);
    doc.text(5 * scale, (_alto * scale * 1.5) / 2, `${_alto} cm  -( ${itemsAlto} renglones) `, { angle: 90 });
    doc.text((_ancho * scale) / 2, 5 * scale, `${_ancho} cm  - (${itemsAncho} columnas) `, { align: "center" });
  
    const piezas = itemsAncho * itemsAlto;
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
  
    doc.text(`${piezas} items (${anchoPieza}cm x ${altoPieza} cm) `, pageWidth / 2, pageHeight / 2, { align: 'center' });
  
    
  
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
    
    
    const nombreArchivo = `${process.cwd()}/files/${uid(16)}Rigido.pdf`;
    
    doc.save(nombreArchivo);
    return nombreArchivo;
  
  }

  module.exports = {
    ImpresionRigido
  }
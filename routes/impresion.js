const { Router } = require('express');

const  { Imprimir} = require("../controllers/impresion");

const router = Router();
//50253
router.get("/:folio",Imprimir);

module.exports= router;
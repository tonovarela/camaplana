const { Router } = require('express');

const  { Imprimir} = require("../controllers/impresion");

const router = Router();
router.get("/:folio",Imprimir);
module.exports= router;
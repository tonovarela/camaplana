const { Router } = require('express');

const  { Imprimir} = require("../controllers/impresion");

const router = Router();
//router.get("/rigido",ImpresionRigido);
//router.get("/flexible",ImpresionFlexible);

router.get("/imprimir",Imprimir);

module.exports= router;
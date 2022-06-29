const { Router } = require('express');

const  { ImpresionRigido} = require("../controllers/impresion");

const router = Router();
router.get("/rigido",ImpresionRigido);

module.exports= router;
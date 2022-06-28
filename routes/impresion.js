const { Router } = require('express');

const  { ImpresionController } = require("../controllers/impresion");

const router = Router();
router.get("/",ImpresionController);

module.exports= router;
const express = require('express');
const cors = require('cors');
const path = require("path");
const port=8085;

const app = express();

app.use(cors());


app.use('/api/impresion',require("./routes/impresion"));

app.use(express.json());

app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'public/index.html'));

});


app.listen(port, ()=>{
    console.log("Servidor corriendo en el puerto 8085");
});
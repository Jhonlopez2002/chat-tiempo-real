const { Router } = require('express');//permite crear rutas
const path = require('path');//rutas de archivos

const mainRouter = Router();//definiendo el enrutador

mainRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));//ubicacion del archivo del index
});

module.exports = mainRouter;
//creacion del puerto con el que se trabajo: 3000
const server = require('./src/index.js');
const PORT = 3000;
//iniciar servidor en la direccion del PORT es decir el puerto
server.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
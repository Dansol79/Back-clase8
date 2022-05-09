const express = require('express');
const app = express();
const multer = require('multer');
const router = require ('./routers/routesProductos');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("./vistas"));
app.use(multer({ dest: './public/imagenes' }).single('imagen'));


//Puerto
const PORT = 8080;

//Rutas

app.use('/api/productos', router());


//Habilitar puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})
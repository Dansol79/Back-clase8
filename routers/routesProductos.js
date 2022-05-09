const express = require('express');
const router = express.Router();
const Contenedor = require('../contenedor/contenedor');
const fs = require('fs');


const Product = new Contenedor(__dirname + '/../data/productos.json');
Product.leer();

const midleError = function (err, req, res, next) {
    if (err) {
        return res.status(500).json({
            error: 'Error en el servidor'
        });
    }
    next();
}

const midlePrecio = function (req, res, next) {

    if (req.body.title === '' || req.body.price === '' || req.body.thumbnail === '') {
        return res.status(500).json({
            error: 'Todos los campos son obligatorios'
        });
    }
    next();
}


module.exports = function () {


    router.get('/', midleError, async (req, res) => {
        const arrProductos = await Product.getAll();
        res.json(arrProductos);
    });


    router.get('/:id', async (req, res) => {
        let id = Number(req.params.id);
        const producto = await Product.getById(id)
        res.json(producto);
    });

    router.post('/', midlePrecio, async (req, res) => {
        let producto = req.body;
        await Product.save(producto);
        res.json(producto);

    });

    router.put('/:id', async (req, res) => {
        let id = Number(req.params.id);
        let producto = req.body;
        await Product.update(id, producto);
        res.json(producto);

    });

    router.delete('/:id', async (req, res) => {
        let id = Number(req.params.id);
        await Product.deleteById(id);
        res.json({
            message: 'Producto eliminado'
        });

    });

    return router;

}
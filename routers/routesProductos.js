const express = require('express');
const router = express.Router();
const Contenedor = require('../contenedor/contenedor');
const fs = require('fs');
const contenedor = require('../contenedor/contenedor');


const Product = new Contenedor(__dirname + '/../data/productos.json');
Product.leer();




module.exports = function () {


    router.get('/', async (req, res) => {
        const arrProductos = await Product.getAll();
        res.json(arrProductos);
    });


    router.get('/:id', async (req, res) => {
        let id = Number(req.params.id);
        const producto = await Product.getById(id)  

        if(producto !== null){
        res.json(producto);
        }else{
            res.status(404).json({ message: 'No existe el producto'});      
        };
                
    });

    router.post('/', async (req, res) => {
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
        res.json({ message: 'Producto eliminado'});

    });

    return router;

}
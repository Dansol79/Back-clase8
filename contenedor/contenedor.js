
const fs = require('fs');


class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.contarID = 1;
        this.productos = [];

    }

    async leer() {
        try {

            let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            this.productos = JSON.parse(contenido)

            for (let elemento of this.productos) {
                if (elemento.id > this.contarID) {
                    this.contarID = elemento.id;
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    async escribir() {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos));

    }

    save(object) {

        let id = this.contarID;
        if (this.productos.length > 0) {
            id = this.productos[this.productos.length - 1].id + 1;
        }
        object.id = id;
        this.productos.push(object);
        this.escribir();
        return id;
    }

    getById(id) { //Recibe un id y devuelve el objeto con ese id, o null si no está.
        let result
        if (this.productos !== []) {
            result = this.productos.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo está vacío'
        }
        return result
    }

    async getAll() {
        await this.leer();
        return this.productos;
    }


    async deleteById(id) {
        await this.leer();
        if (this.leer() !== []) {
            const resultado = this.productos.filter(producto => producto.id !== id);
            this.productos = new Array(resultado);
            this.escribir();

        } else {
            console.log('No hay productos');
        }
        return resultado;

    }

    deleteAll() {
        if (this.leer() !== []) {
            this.productos = [];
            this.escribir();
        } else {
            console.log('No hay productos');
        }

    }

    update(id, object) {

        const index = this.productos.findIndex(x => x.id === id);
        object.id = this[index].id;
        this.productos[index] = object;
        return object;
    }
}

module.exports = Contenedor;


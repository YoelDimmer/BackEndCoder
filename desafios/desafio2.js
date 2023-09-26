const {promises: fs } = require('fs');


class ProductManager{

    constructor(path){
        this.path = path;
    }

    getProducts = () => getJSONFromFile(this.path)

    newID = () => parseInt(Math.random()*10000)
        
    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios.');
        }
        const products = await getJSONFromFile(this.path);
        if (products.find((p) => p.code === code)) {
            console.log(`El codigo ya esta ingresado: ${code}`)
        } else {
            const id = this.newID()
            const newProduct = { id, title, description, price, thumbnail, code, stock };
            products.push(newProduct);
            await saveJSONToFile(this.path, products);
        }
    }

    async getProductById(id) { 
        const products = await getJSONFromFile(this.path);
        let productById = products.find(p => p.id === id)
        if (!productById) {
            console.log("No se ha encontrado el producto.")
        } else {
            console.log("Producto encontrado:", productById)
        }
    }

    async deleteProduct(id){
        const products = await getJSONFromFile(this.path);
        let index = products.findIndex((p) => p.id === id)
        if (index  > -1 ){
            products.splice(index, 1)
            await saveJSONToFile(this.path, products);
            console.log("Producto eliminado.")
        } else{
            console.log('No se ha podido eliminar el producto.');
        }
        
    }

    async updateProduct(id, newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
        const getProducts = await getJSONFromFile(this.path);
        let ProdId = getProducts.find(p => p.id === id)
        if (!ProdId) {
            console.log(`No se pudo actualizar el producto con el id: ${id}`)
        } else { 
                const products = { id:id, title: newTitle, description: newDescription, price: newPrice, thumbnail: newThumbnail, code: newCode, stock: newStock }
                await saveJSONToFile(this.path, products);
                console.log("Producto actualizado correctamente", products)                      
        }
    }
}

const getJSONFromFile = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        return [];
    }
    const content = await fs.readFile(path, 'utf-8');
    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
    }
}

const saveJSONToFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t'); 
    try {
        await fs.writeFile(path, content, 'utf-8');
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser escrito.`);
    }
}  

const deleteFile = async (path)=> {
    try {
        console.log('Eliminando el archivo...')
        await fs.unlink('./products.json') 
        console.log('Archivo eliminado correctamente')
    } catch (error) {
        throw new Error(`El archivo ${path} no pudo ser eliminado.`);
    }      
}   


const desafio = async () => {
    try {
        const productManager = new ProductManager("./products.json");
        await productManager.addProduct({
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: "sin imagen",
            code: "abc123",
            stock: 25
        });
        const products = await productManager.getProducts();
        console.log('Productos:', products);
        productManager.getProductById()
        productManager.deleteProduct() 
        /* await productManager.updateProduct(8741, "Nuevo Titulo", "Descripcion", 200, "Imagen", "Codigo", 10) */
    } catch (error) {
        console.error(' Ha ocurrido un error: ', error.message); 
    }
}

desafio()



class ProductManager{

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct(title,description,price,thumbnail,code,stock){
        let prodExists = this.products.find(prod => prod.code === code)
        if (prodExists){
            return console.log("El producto ya esta ingresado")
        } else{
            this.products.push(
                {
                    id: this.products.length + 1,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                }
            )
            console.log("Producto agregado")
        }

    }

    getProductById(id){
        let findProd = this.products.find(prod => prod.id === id)
        if (!findProd){
            console.log("El producto no existe")
        }else{
            console.log("Producto encontrado", findProd)
        }
    }
}

let productManager = new ProductManager()

console.log("getProducts",productManager.getProducts())

productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)

console.log("getProducts2",productManager.getProducts())

productManager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)

productManager.getProductById(1)

productManager.getProductById(5)

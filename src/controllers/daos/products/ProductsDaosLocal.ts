import ContenedorLocal from "../../contenedores/ContenedorLocal";

export default class ProductsDaosLocal extends ContenedorLocal {
    constructor(model: any) {
        super(model);
    }
    createProduct(product: any) {
        try {
            this.model.push({...product, id:this.generateId()});
           
            return { status: 1, data: this.model };
        } catch (error) {
            console.log(error);
            return { status: -1 };
        }
    }

    editProducts(id: string, product: any) {
        try {
            let index = this.model.findIndex((item: { id: string; }) => item.id == id);
            this.model[index] = product;
            return { status: 1, data: this.model };
        } catch (error) {
            console.log(error);
            return { status: -1 };
        }
    }

}
import ContenedorMongo from "../../contenedores/ContenedorMongo";

export default class ProductosDaosMongo extends ContenedorMongo {
  constructor(ruta: string, model: any) {
    super(ruta, model);
  }

  async listAll() {
    try {
      console.log("entro a getProducts");
      const modelo = await this.model.find();
      console.log(modelo);
      return { status: 1, data: modelo };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  async createProduct(prod: any) {
    try {
      const prodSavedModel = new this.model(prod);
      let prodSave = await prodSavedModel.save();
      console.log("guardado");
      console.log(prodSave);
      return { status: 1, data: prodSave };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  async editProducts(id: string, product: any) {
    try {
      let Product = await this.model.findByIdAndUpdate(id, product);
      return { status: 1, data: Product };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }
}

import ContenedorMongo from "../../contenedores/ContenedorMongo";
import { products } from "../../models/products";

export default class CarritoDaosMongo extends ContenedorMongo {
  constructor(ruta: string, model: any) {
    super(ruta, model);
  }

  async createCart() {
    try {
      //@ts-ignore
      const cartSavedModel = new this.model({
        timestamp: new Date().toLocaleDateString(),
        products: [],
      });

      let cartdSave = await cartSavedModel.save();
      return { status: 1, data: cartdSave };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  async addProductToCart(id: string, idProd: any) {
    try {
      let Cart = await this.model.findById(id);
      let prod = await products.findById(idProd);
      console.log("------------");
      console.log(prod);
      Cart.products.push(prod);

      let CartUpdated = await this.model.findByIdAndUpdate(id, Cart);

      return { status: 1, data: CartUpdated };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  async listProductsOfCart(id: string) {
    try {
      let Cart = await this.model.findById(id);
      return { status: 1, data: Cart.products };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  async deleteProductFromCart(idCart: any, idProduct: any) {
    try {
      let Cart = await this.model.findById(idCart);
      let prod = await products.findById(idProduct);
      const CartFinal = Cart.products.map((item: any) => {
        if (item._id == idProduct) {
          item = prod;
          console.log("COINCIDENCIA");
          return item;
        }
      });
      Cart.products = CartFinal;

      let CartUpdated = await this.model.findByIdAndUpdate(idCart, Cart);

      return { status: 1, data: CartUpdated };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }
}

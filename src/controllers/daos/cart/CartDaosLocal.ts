import ContenedorLocal from "../../contenedores/ContenedorLocal";

export default class CartDaosLocal extends ContenedorLocal {
  constructor(model: any) {
    super(model);
  }

  createCart() {
    try {
      let id = this.generateId();
      this.model.push({
        timestamp: new Date().toLocaleDateString(),
        products: [],
        id: id,
      });

      return { status: 1, data: id };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  listProductsOfCart(id: string) {
    try {
      let cart = this.model.find((item: { id: string }) => item.id == id);
      return { status: 1, data: cart.products };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  addProductToCart(id: string, idProd: any) {
    try {
      let Cart = this.model.find((item: { id: string }) => item.id == id);
      let prod = this.model2.find((item: { id: string }) => item.id == idProd);
      console.log(this.model);
      console.log("------------");
      //  console.log(prod)
      Cart.products.push(prod);
      let CartUpdated = this.model.find(
        (item: { id: string }) => item.id == id
      );
      CartUpdated.products = Cart.products;
      return { status: 1, data: CartUpdated };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  deleteProductFromCart(cartId: string, productId: string) {
    try {
      let Cart = this.model.find((item: { id: string }) => item.id == cartId);
      console.log(Cart);
      //quit product on cart by id
      Cart.products = Cart.products.filter(
        (item: { id: string }) => item.id != productId
      );

      let cartUpdated = {
        ...this.model.filter((item: { id: string }) => item.id != cartId),
        Cart,
      };

      return { status: 1, data: cartUpdated };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }
}

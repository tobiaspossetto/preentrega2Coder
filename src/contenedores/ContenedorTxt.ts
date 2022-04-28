//import ProductsController from "./ProductsController";
import fs from 'fs';
//const PC = new ProductsController();


export default class CartController{
    path: any;

    constructor(path: any){
        this.path = path;
        
    }

    async deleteOne(id:string){
        try {
            let data: any = await fs.promises.readFile(this.path);
            data = await JSON.parse(data);
            data = data.filter((cart: { id: any }) => cart.id != id);
      
            await fs.promises.writeFile(this.path, "");
            return { status: 1 };
          } catch (error) {
            console.log(error);
            //opte por -1 para responder con un 500
            return { status: -1 };
          }
    }
    

    async listOne(id:string){
      try {
          let data: any = await fs.promises.readFile(this.path);
          data = await JSON.parse(data);
          const cart = data.filter((cart: { id: any }) => cart.id == id);
      
          return { status: 1, data: cart[0].productos };
        } catch (error) {
          console.log(error);
          //opte por -1 para responder con un 500
          return { status: -1 };
        }
  }
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.path, "");
            return { status: 1 };
          } catch (error) {
            console.log(error);
            //opte por -1 para responder con un 500
            return { status: -1 };
          }
    }

    

    

    
}
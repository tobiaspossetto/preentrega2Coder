import CartDaosLocal from "./daos/cart/CartDaosLocal";
import CartDaosMongo from "./daos/cart/CartDaosMongo"; 
import CartDaosFirebase from "./daos/cart/CartDaosFirebase";
import CartDaosTxt from "./daos/cart/CartDaosTxt";


import ProductsDaosFirebase from "./daos/products/ProductsDaosFirebase";
import ProductsDaosMongo from "./daos/products/ProductsDaosMongo";
import ProductsDaosLocal from "./daos/products/ProductsDaosLocal";
import ProductsDaosTxt from "./daos/products/ProductsDaosTxt";

import {cart} from "./models/cart";
import {products} from "./models/products";
// firebase
// mongo
// local
// txt
let db = 'mongo';


const DATABASES = {
     firebase: {

         productController : new ProductsDaosFirebase('products'),
         cartController : new CartDaosFirebase('cart')
     },
        
     mongo:{
        productController : new ProductsDaosMongo("mongodb://localhost:27017/ecommerce", products),
        cartController : new CartDaosMongo("mongodb://localhost:27017/ecommerce", cart)
     },
      
        
     local:{

         productController : new ProductsDaosLocal('products'),
         cartController : new CartDaosLocal('cart')
     },
        
     txt:{

         productController : new ProductsDaosTxt('src/db/productos.txt'),
         cartController : new CartDaosTxt('src/db/cart.txt')
     }
        
  
}

//@ts-ignore
const {cartController, productController} = DATABASES[db];

export {cartController, productController}
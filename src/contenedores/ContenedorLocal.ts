let carts: any = []
let products:any = []


export default class ContenedorLocal{
  
    model:any = []
   
    model2: any = []
    constructor(model:string){
      
        if(model == 'cart'){
            this.model = carts
            this.model2 = products
        }else if(model == 'products'){
            this.model = products
            this.model2 = carts
        }
    }

     listAll(){
        try{
            let list =  this.model
            return {status:1,data:list}
        }catch(error){
            console.log(error);
            return {status:-1}
        }
    }

    listOne(id:string){
        try{
            let list =  this.model.find((item: { id: string }) => item.id == id)
            return {status:1,data:list}
        }catch(error){
            console.log(error);
            return {status:-1}
        }
    }

    deleteOne(id:string){
        try{
            let list =  this.model.filter((item: { id: string }) => item.id != id)
            this.model = list
            return {status:1,data:list}
        }catch(error){
            console.log(error);
            return {status:-1}
        }
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
} 
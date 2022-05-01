import ContenedorFirebase from '../../contenedores/ContenedorFirebase'

export default class FirebaseProductos extends ContenedorFirebase {
  constructor(collection: any) {
    super(collection)
  }

  async getProducts(id?:string) {
    try {
        const result: any[] = []
        if(id){
            const doc = await this.query.doc(id).get()
            result.push(doc.data())
        }else{
            const snapshot = await this.query.get()
            snapshot.forEach((doc: { data: () => any }) => {
                result.push(doc.data())
            })
        }
       
        return {status: 1, data: result}
      } catch (error) {
        console.log(error)
        return {status: -1}
      }
  }

  async createProduct(product: any){
    try {
      const doc = await this.query.add(product)
      return { status: 1, data: doc.id }
    } catch (error) {
      console.error(error)
      return { status: -1 }
    }
  }

  async editProducts(id: string, data: any) {
    try {
      const doc = await this.query.doc(id).update(data)
      return { status: 1 , data: doc}
    } catch (error) {
     console.log(error)
     return { status: -1}
    }
  }

  
}
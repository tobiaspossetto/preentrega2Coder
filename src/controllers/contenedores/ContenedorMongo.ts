import mongoose from "mongoose";

export default class ContenedorMongo {
  ruta: string;
  model: any;

  constructor(ruta: string, model: any) {
    this.ruta = ruta;
    this.model = model;

    this.getConnection();
  }
  async getConnection() {
    try {
      mongoose.connect(this.ruta, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
      console.log(this.ruta);

      return mongoose;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  async listOne(id: string) {
    try {
      const modelo = await this.model.findById(id);
      console.log(modelo);
      return { status: 1, data: modelo };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  async deleteAll() {
    try {
      const modelo = await this.model.deleteMany();
      console.log(modelo);
      return { status: 1, data: modelo };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }

  async deleteOne(id: string) {
    try {
      const modelo = await this.model.findByIdAndDelete(id);
      console.log(modelo);
      return { status: 1, data: modelo };
    } catch (error) {
      console.log(error);
      return { status: -1 };
    }
  }
}

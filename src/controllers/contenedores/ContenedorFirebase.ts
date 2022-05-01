import admin from "firebase-admin";

var serviceAccount = require("../../key/node-test-329a9-firebase-adminsdk-i5m50-3a621db61e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-test-329a9.firebaseio.com",
});

export default class ContenedorFirebase {
  db: any;
  query: any;
  query2: typeof admin.firestore;

  constructor(collect: any) {
    this.query2 = admin.firestore;
    this.db = admin.firestore();
    this.query = this.db.collection(collect);
  }

  async listAll() {
    console.log("ejecutando");
    try {
      const result: any[] = [];
      const snapshot = await this.query.get();
      snapshot.forEach((doc: { id: any; data: () => any }) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return { status: 1, data: result };
    } catch (error) {
      console.error(error);
      return { status: -1 };
    }
  }

  async listOne(id: any) {
    try {
      const doc = await this.query.doc(id).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`);
      } else {
        const data = doc.data();
        return { status: 1, data: { ...data, id } };
      }
    } catch (error) {
      return { status: -1 };
    }
  }

  async deleteOne(id: string) {
    try {
      const doc = await this.query.doc(id).delete();
      return { status: 1, data: doc };
    } catch (error) {
      return { status: -1 };
    }
  }

  async deleteAll() {
    try {
      const snapshot = await this.query.get();
      snapshot.forEach((doc: { id: any }) => {
        this.query.doc(doc.id).delete();
      });
      return { status: 1, data: "eliminado" };
    } catch (error) {
      return { status: -1 };
    }
  }
}

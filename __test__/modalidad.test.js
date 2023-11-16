const request = require("supertest")
const app = require("../index")

afterAll(done=>{
  app.close();
  done();
},60000)

describe("POST /modalidades/ingresar-modalidad",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el nombre de modulo", async () => {
    const response = await request(app).post("/modalidades/ingresar-modalidad").type('form').send({nombre:"Pelea"});
    expect(response.status).toBe(200);
    expect(response.body.modalidad).toHaveProperty("nombre", "Pelea")
  },60000)
})

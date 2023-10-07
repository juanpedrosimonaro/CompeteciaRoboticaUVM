const request = require("supertest")
const app = require("../index")

afterAll(done=>{
  app.close();
  done();
})

describe("POST /categorias/ingresar-categoria",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el nombre de modulo", async () => {
    const response = await request(app).post("/categorias/ingresar-categoria").send({modalidadId:0, name:"Pelea"});
    expect(response.status).toBe(200);
  })
})

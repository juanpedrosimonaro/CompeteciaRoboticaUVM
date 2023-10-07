const request = require("supertest")
const app = require("../index")

afterAll(done=>{
  app.close();
  done();
})

describe("POST /modalidades/ingresar-modalidad",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el nombre de modulo", async () => {
    const response = await request(app).post("/modalidades/ingresar-modalidad").send({name:"Pelea"});
    expect(response.status).toBe(200);
  })
})

const request = require("supertest");
const app = require("../index");
var modalidadId;

afterAll(done=>{
  app.close();
  done();
},60000)

describe("POST /modalidades/ingresar-modalidad",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el nombre de modulo", async () => {
    const response = await request(app).post("/modalidades/ingresar-modalidad").type('form').send({nombre:"Pelea"});
    modalidadId = response.body.modalidad.id;
    expect(response.status).toBe(200);
    expect(response.body.modalidad).toHaveProperty("nombre", "Pelea");
  },60000)
})

  describe("PUT /modalidades/editar-modalidad",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la categoria dado un id de modalidad", async () => {
    const response = await request(app).put(`/modalidades/editar-modalidad/${modalidadId}`).type('form').send({nombre:"Boxeo"});
    expect(response.status).toBe(200);
    expect(response.body.modalidad).toHaveProperty("nombre", "Boxeo");
  })
})
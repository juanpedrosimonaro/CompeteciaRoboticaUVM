const request = require("supertest")
const app = require("../index")
var modalidadId
var categoriaId

afterAll(done=>{
  app.close();
  done();
})

describe("POST /categorias/ingresar-categoria", ()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el id de la modalidad y el nombre de la categoria", async () => {
    const responseMod = await request(app).post("/modalidades/ingresar-modalidad").type('form').send({nombre:"Busqueda"});
    expect(responseMod.status).toBe(200);
    modalidadId = responseMod.body.modalidad.id;
    const response = await request(app).post("/categorias/ingresar-categoria").type('form').send({modalidadId, nombre:"Objetos"});
    expect(response.status).toBe(200);
    categoriaId = response.body.categoria.id;
    expect(response.body.categoria).toHaveProperty("ModalidadId",modalidadId);
    expect(response.body.categoria).toHaveProperty( "nombre", "Objetos");
  },60000)
})

  describe("PUT /categorias/editar-categoria",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la categoria dado un id de modalidad", async () => {
    const response = await request(app).put(`/categorias/editar-categoria/${categoriaId}`).type('form').send({modalidadId, nombre:"Luces"});
    expect(response.status).toBe(200);
    expect(response.body.categoria).toHaveProperty("ModalidadId",modalidadId);
    expect(response.body.categoria).toHaveProperty( "nombre", "Luces");
  })
})
describe("DELETE /categorias/eliminar-categoria",()=>{
  it("deberia retornar de forma exitosa si se ha eliminado el registro de categoria", async () => {
    const response = await request(app).delete("/categorias/eliminar-categoria/").type('form').send({categoriaId});
    expect(response.status).toBe(200);
    expect(response.body.eliminado).toBe(true)
  })
})

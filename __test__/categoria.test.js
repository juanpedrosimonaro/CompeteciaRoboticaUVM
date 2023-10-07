const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})

describe("POST /categorias/ingresar-categoria",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el id de la modalidad y el nombre de la categoria", async () => {
    const response = await agent.post("/categorias/ingresar-categoria").type('form').send({modalidadId:0, nombre:"Acido"});
    expect(response.status).toBe(200);
    expect(response.body.categorias.at(-1)).toEqual({modalidadId:0, nombre:"Acido"})
  })
})

describe("PUT /categorias/editar-categoria",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la categoria dado un id de modalidad", async () => {
    const response = await agent.put("/categorias/editar-categoria/0").type('form').send({modalidadId:0, nombre:"Lanzallamas"});
    expect(response.status).toBe(200);
    expect(response.body.categoria).toEqual({modalidadId:0, nombre:"Lanzallamas"})
  })
})

describe("DELETE /categorias/eliminar-categoria",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la categoria dado un id de modalidad", async () => {
    const response = await agent.delete("/categorias/eliminar-categoria/").type('form').send({categoriaId:0});
    expect(response.status).toBe(200);
    expect(response.body.categoria).toEqual({modalidadId:0, nombre:"Lanzallamas"})
  })
})

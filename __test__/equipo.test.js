const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})

describe("POST /equipos/ingresar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el id de la modalidad y el nombre del equipo", async () => {
    const response = await agent.post("/equipos/ingresar-equipo").type('form').send({nombre:"Roboticos", integrantes:["18379420","23084755","25409410"], catIns:[0,1,2]});
    expect(response.status).toBe(200);
    expect(response.body.equipos.at(-1)).toEqual({nombre:"Roboticos", integrantes:["18379420","23084755","25409410"], catIns:[0,1,2]})
  })
})

/*
describe("PUT /equipos/editar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la equipo dado un id de modalidad", async () => {
    const response = await agent.put("/equipos/editar-equipo/0").type('form').send({modalidadId:0, nombre:"Lanzallamas"});
    expect(response.status).toBe(200);
    expect(response.body.equipo).toEqual({modalidadId:0, nombre:"Lanzallamas"})
  })
})

describe("DELETE /equipos/eliminar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la equipo dado un id de modalidad", async () => {
    const response = await agent.delete("/equipos/eliminar-equipo/").type('form').send({equipoId:0});
    expect(response.status).toBe(200);
    expect(response.body.equipo).toEqual({modalidadId:0, nombre:"Lanzallamas"})
  })
})
*/

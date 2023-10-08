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

describe("PUT /equipos/editar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la equipo dado un id de modalidad", async () => {
    const response = await agent.put("/equipos/editar-equipo/0").type('form').send({nombre:"Cortocircuitos", integrantes:["19475603","28461305","29406561"], catIns:[0,2,3]});
    expect(response.status).toBe(200);
    expect(response.body.equipo).toEqual({nombre:"Cortocircuitos", integrantes:["19475603","28461305","29406561"], catIns:[0,2,3]})
  })
})

describe("DELETE /equipos/eliminar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre de la equipo dado un id de modalidad", async () => {
    const response = await agent.delete("/equipos/eliminar-equipo/").type('form').send({equipoId:0});
    expect(response.status).toBe(200);
    expect(response.body.equipo).toEqual({nombre:"Cortocircuitos", integrantes:["19475603","28461305","29406561"], catIns:[0,2,3]})
  })
})

describe("GET /equipos/equipos",()=>{
  it("deberia retornar de forma exitosa todos los equipos", async () => {
    const response1 = await agent.post("/equipos/ingresar-equipo").type('form').send({nombre:"Roboticos", integrantes:["18379420","23084755","25409410"], catIns:[0,1]});
    expect(response1.status).toBe(200);
    const response2 = await agent.post("/equipos/ingresar-equipo").type('form').send({nombre:"Cortocircuitos", integrantes:["19475603","28461305","29406561"], catIns:[2]});
    expect(response2.status).toBe(200);
    const response = await agent.get("/equipos/equipos");
    expect(response.body.equipos).toEqual([{nombre:"Roboticos", integrantes:["18379420","23084755","25409410"], catIns:[0,1]},{nombre:"Cortocircuitos", integrantes:["19475603","28461305","29406561"], catIns:[2]}])
  })
})

describe("GET /equipos/equiposPorCategoria",()=>{
  it("deberia retornar de forma exitosa todos los equipos organizados por categorias", async () => {
    const response1 = await agent.post("/categorias/ingresar-categoria").type('form').send({modalidadId:0, nombre:"Acido"});
    expect(response1.status).toBe(200);
    const response2 = await agent.post("/categorias/ingresar-categoria").type('form').send({modalidadId:0, nombre:"Lanzallamas"});
    expect(response2.status).toBe(200);
    const response3 = await agent.post("/categorias/ingresar-categoria").type('form').send({modalidadId:1, nombre:"Busqueda"});
    expect(response3.status).toBe(200);
    const response = await agent.get("/equipos/equiposPorCategoria");
    expect(response.body.equiposPorCategoria).toEqual([{nombre:"Acido",equipos:[{nombre:"Roboticos", integrantes:["18379420","23084755","25409410"], catIns:[0,1]}]},{nombre:"Lanzallamas",equipos:[{nombre:"Roboticos", integrantes:["18379420","23084755","25409410"], catIns:[0,1]}]},{nombre:"Busqueda",equipos:[{nombre:"Cortocircuitos", integrantes:["19475603","28461305","29406561"], catIns:[2]}]}]);
  })
})
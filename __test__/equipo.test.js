const request = require("supertest")
const app = require("../index")
var modalidadId;
var categoriaId;
var equipoId;
var equipoId2;

afterAll(done=>{
  app.close();
  done();
})

describe("POST /equipos/ingresar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado nombre del equipo, sus integrantes y las categorias inscritas", async () => {
    const responseMod = await request(app).post("/modalidades/ingresar-modalidad").type('form').send({nombre:"Busqueda"});
    expect(responseMod.status).toBe(200);
    modalidadId = responseMod.body.modalidad.id;
    const responseCat = await request(app).post("/categorias/ingresar-categoria").type('form').send({modalidadId, nombre:"Objetos"});
    expect(responseCat.status).toBe(200);
    categoriaId = responseCat.body.categoria.id;
    const response = await request(app).post("/equipos/ingresar-equipo").type('form').send({nombre:"Roboticos", integrantes:[{cedula:"18379420",nombre:"Mauricio"},{cedula:"23084755",nombre:"Pedro"},{cedula:"25409410",nombre:"Antonio"}], catIns:[1]});
    expect(response.status).toBe(200);
    equipoId = response.body.equipo.id;
    expect(response.body.equipo).toHaveProperty("nombre","Roboticos");
    expect(response.body.integrantes).toEqual([expect.objectContaining({cedula:"18379420",nombre:"Mauricio"}),expect.objectContaining({cedula:"23084755",nombre:"Pedro"}),expect.objectContaining({cedula:"25409410",nombre:"Antonio"})]);
    expect(response.body.catIns).toEqual([categoriaId])
  },60000);
})

describe("PUT /equipos/editar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha editado el nombre del equipo dado un id de equipo", async () => {
    const response = await request(app).put(`/equipos/editar-equipo/${equipoId}`).type('form').send({nombre:"Cortocircuitos", integrantes:[{cedula:"19475603",nombre:"Marcos"},{cedula:"28461305",nombre:"Andres"},{cedula:"29406561",nombre:"Bernardo"}], catIns:[categoriaId]});
    expect(response.status).toBe(200);
    expect(response.body.equipo).toHaveProperty("nombre","Cortocircuitos");
    expect(response.body.integrantes).toEqual([expect.objectContaining({cedula:"19475603",nombre:"Marcos"}),expect.objectContaining({cedula:"28461305",nombre:"Andres"}),expect.objectContaining({cedula:"29406561",nombre:"Bernardo"})]);
    expect(response.body.catIns).toEqual([categoriaId])
  })
})

describe("DELETE /equipos/eliminar-equipo",()=>{
  it("deberia retornar de forma exitosa si se ha eliminado el equipo", async () => {
    const response = await request(app).delete("/equipos/eliminar-equipo/").type('form').send({equipoId});
    expect(response.status).toBe(200);
    expect(response.body.eliminado).toBe(true)
  })
})

describe("GET /equipos/equipos",()=>{
  it("deberia retornar de forma exitosa todos los equipos", async () => {
    const response1 = await request(app).post("/equipos/ingresar-equipo").type('form').send({nombre:"Roboticos", integrantes:[{cedula:"18379420",nombre:"Mauricio"},{cedula:"23084755",nombre:"Pedro"},{cedula:"25409410",nombre:"Antonio"}], catIns:[categoriaId]});
    expect(response1.status).toBe(200);
    equipoId = response1.body.equipo.id;
    const response2 = await request(app).post("/equipos/ingresar-equipo").type('form').send({nombre:"Cortocircuitos", integrantes:[{cedula:"19475603",nombre:"Marcos"},{cedula:"28461305",nombre:"Andres"},{cedula:"29406561",nombre:"Bernardo"}], catIns:[categoriaId]});
    expect(response2.status).toBe(200);
    equipoId2 = response2.body.equipo.id;
    const response = await request(app).get("/equipos/equipos");
    expect(response.status).toBe(200);
    expect(response.body.equipos).toEqual(expect.arrayContaining([expect.objectContaining({nombre:"Roboticos"}),expect.objectContaining({nombre:"Cortocircuitos"})]))
  })
})

describe("GET /equipos/equiposPorCategoria",()=>{
  it("deberia retornar de forma exitosa todos los equipos organizados por categorias", async () => {
    const response1 = await request(app).post("/categorias/ingresar-categoria").type('form').send({modalidadId, nombre:"Luces"});
    expect(response1.status).toBe(200);
    categoriaId2 = response1.body.categoria.id
    const response2 = await request(app).put(`/equipos/editar-equipo/${equipoId}`).type('form').send({nombre:"Cortocircuitos", integrantes:[{cedula:"19475603",nombre:"Marcos"},{cedula:"28461305",nombre:"Andres"},{cedula:"29406561",nombre:"Bernardo"}], catIns:[categoriaId2]});
    expect(response2.status).toBe(200);
    const response = await request(app).get("/equipos/equiposPorCategoria");
    expect(response.status).toBe(200);
    expect(response.body.categorias).toEqual(expect.arrayContaining([expect.objectContaining({nombre:"Objetos",Equipos:[expect.objectContaining({nombre:"Cortocircuitos"})]}),expect.objectContaining({nombre:"Luces",Equipos:[expect.objectContaining({nombre:"Roboticos"})]})]));
  })
})

describe("DELETE /equipos/eliminarCategoriaDeEquipo",()=>{
  it("deberia eliminar la categoria del equipo", async () => {
    const response = await request(app).delete("/equipos/eliminarCategoriaDeEquipo").type('form').send({eqId:equipoId,catId:categoriaId});
    expect(response.status).toBe(200);
    expect(response.body.eliminado).toBe(true);
  })
})
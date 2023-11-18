const request = require("supertest");
const app = require("../index");

var modalidadId;
var categoriaId;
var equipoId;
var patrocinadorId;
var equipoId2;

afterAll(done=>{
  app.close();
  done();
})

describe("POST /patrocinadores/ingresar-patrocinador",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el nombre del patrocinador", async () => {
    const responseMod = await request(app).post("/modalidades/ingresar-modalidad").type('form').send({nombre:"Pelea"});
    expect(responseMod.status).toBe(200);
    modalidadId = responseMod.body.modalidad.id;
    const responseCat = await request(app).post("/categorias/ingresar-categoria").type('form').send({modalidadId, nombre:"Invasor"});
    expect(responseCat.status).toBe(200);
    categoriaId = responseCat.body.categoria.id;
    const responseEq = await request(app).post("/equipos/ingresar-equipo").type('form').send({nombre:"Automatas", integrantes:[], catIns:[categoriaId]});
    expect(responseEq.status).toBe(200);
    equipoId = responseEq.body.equipo.id;
    const response = await request(app).post("/patrocinadores/ingresar-patrocinador").type('form').send({nombre:"Coca-Cola",equipos:[equipoId]});
    expect(response.status).toBe(200);
    patrocinadorId = response.body.patrocinador.id;
    expect(response.body.patrocinador).toEqual(expect.objectContaining({nombre:"Coca-Cola"}));
    expect(response.body.equipos).toEqual([expect.objectContaining({nombre:"Automatas"})]);
  },60000)
})

describe("GET /patrocinadores/patrocinadores",()=>{
  it("deberia retornar de forma exitosa todos los patrocinadores", async () => {
    const responseEq = await request(app).post("/equipos/ingresar-equipo").type('form').send({nombre:"Guerreros", integrantes:[], catIns:[categoriaId]});
    expect(responseEq.status).toBe(200);
    equipoId2 = responseEq.body.equipo.id;
    const response1 = await request(app).post("/patrocinadores/ingresar-patrocinador").type('form').send({nombre:"Intel",equipos:[equipoId2]});
    expect(response1.status).toBe(200);
    const response = await request(app).get("/patrocinadores/patrocinadores");
    expect(response.body.patrocinadores).toEqual(expect.arrayContaining([expect.objectContaining({nombre:"Coca-Cola"}),expect.objectContaining({nombre:"Intel"})]))
  })
})

describe("GET /patrocinadores/patrocinadoresPorEquipo",()=>{
  it("deberia retornar de forma exitosa todos los patrocinadores organizados por equipos", async () => {
    const response = await request(app).get("/patrocinadores/patrocinadoresPorEquipo");
    expect(response.body.equipos).toEqual(expect.arrayContaining([expect.objectContaining({nombre:"Automatas",Patrocinadors:[expect.objectContaining({nombre:"Coca-Cola"})]}),expect.objectContaining({nombre:"Guerreros",Patrocinadors:[expect.objectContaining({nombre:"Intel"})]})]))
  })
})

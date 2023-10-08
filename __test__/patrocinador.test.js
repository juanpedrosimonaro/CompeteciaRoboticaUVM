const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})

describe("POST /patrocinadores/ingresar-patrocinador",()=>{
  it("deberia retornar de forma exitosa si se ha ingresado el nombre del patrocinador", async () => {
    const response = await agent.post("/patrocinadores/ingresar-patrocinador").type('form').send({nombre:"Coca-Cola"});
    expect(response.status).toBe(200);
    expect(response.body.patrocinadores.at(-1)).toEqual({nombre:"Coca-Cola"})
  })
})

describe("GET /patrocinadores/patrocinadores",()=>{
  it("deberia retornar de forma exitosa todos los patrocinadores", async () => {
    const response1 = await agent.post("/patrocinadores/ingresar-patrocinador").type('form').send({nombre:"Intel"});
    expect(response1.status).toBe(200);
    const response = await agent.get("/patrocinadores/patrocinadores");
    expect(response.body.patrocinadores).toEqual([{nombre:"Coca-Cola"},{nombre:"Intel"}])
  })
})

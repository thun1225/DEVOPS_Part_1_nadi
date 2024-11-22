const { describe, it } = require("mocha");
const { expect } = require("chai");
const { app, server } = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
let baseUrl;

describe("Tour Package API", () => {
  before(async () => {
    const { address, port } = await server.address();
    baseUrl = `http://${address === "::" ? "localhost" : address}:${port}`;
  });

  after(async () => {
    await new Promise(resolve => {
      server.close(() => {
        resolve();
      });
    });
  });

  describe("POST /add-tour", () => {
    it("should return 400 for invalid email", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour")
        .send({
          host: "Hikani",
          officeLocation: "Kumamoto, Japan",
          packageName: "Nagasaki: Explore Japanese Teas on a Tea Tour",
          category: "Asia",
          duration: "9D7N",
          phone: "283927328",
          emailAddress: "hikanimail.com",  // Invalid email format
          price: "2999"
        });
      expect(res).to.have.status(400);
    });

    it("should return 400 for invalid price", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour")
        .send({
          host: "Hikani",
          officeLocation: "Kumamoto, Japan",
          packageName: "Nagasaki: Explore Japanese Teas on a Tea Tour",
          category: "Asia",
          duration: "9D7N",
          phone: "283927328",
          emailAddress: "hikani@mail.com",
          price: "abc"  // Invalid price format
        });
      expect(res).to.have.status(400);
    });

    it("should return 400 for one incomplete data", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour")
        .send({
          host: "",
          officeLocation: "Kumamoto, Japan",
          packageName: "Nagasaki: Explore Japanese Teas on a Tea Tour",
          category: "Asia",
          duration: "9D7N",
          phone: "283927328",
          emailAddress: "hikanimail.com",  // Invalid email
          price: "3444"
        });
      expect(res).to.have.status(400);
    });

    it("should return 400 for all incomplete data", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour")
        .send({
          host: "",
          officeLocation: "",
          packageName: "",
          category: "",
          duration: "",
          phone: "",
          emailAddress: "",
          price: ""
        });
      expect(res).to.have.status(400);
    });

    it("should return 404 for invalid path", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour-package") // Invalid route
        .send({
          host: "Hikani",
          officeLocation: "Kumamoto, Japan",
          packageName: "Nagasaki: Explore Japanese Teas on a Tea Tour",
          category: "Asia",
          duration: "9D7N",
          phone: "283927328",
          emailAddress: "hikani@mail.com",
          price: "3494"
        });
      expect(res).to.have.status(404);
    });

    it("should return 500 for invalid category", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour")
        .send({
          host: "Hikani",
          officeLocation: "Kumamoto, Japan",
          packageName: "Nagasaki: Explore Japanese Teas on a Tea Tour",
          category: "category",  // Invalid category
          duration: "9D7N",
          phone: "283927328",
          emailAddress: "hikani@mail.com",
          price: "2399"
        });
      expect(res).to.have.status(500);
    });

    it("should return 500 for inappropriate data", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour")
        .send({
          host: "fuck",  // Inappropriate host name
          officeLocation: "Kumamoto, Japan",
          packageName: "Nagasaki: Explore Japanese Teas on a Tea Tour",
          category: "Asia",
          duration: "9D7N",
          phone: "283927328",
          emailAddress: "hikani@mail.com",
          price: "2399"
        });
      expect(res).to.have.status(500);
    });

    it("should return 201 for valid data", async () => {
      const res = await chai
        .request(baseUrl)
        .post("/add-tour")
        .send({
          host: "Hikani",
          officeLocation: "Kumamoto, Japan",
          packageName: "Nagasaki: Explore Japanese Teas on a Tea Tour",
          category: "Asia",
          duration: "9D7N",
          phone: "283927328",
          emailAddress: "hikani@mail.com",
          price: "23838323"
        });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("array");
    });
  });

  describe("GET /view-tour", () => {
    it("should return all resources", async () => {
      const res = await chai.request(baseUrl).get("/view-tour");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
    });
  });
});

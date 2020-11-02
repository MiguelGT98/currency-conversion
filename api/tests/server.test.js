// Import app (Express with all routes defined)
const app = require("../app");

// Import supertest to make requests
const request = require("supertest");

// Tests for login
describe("Test login endpoint", () => {
  test("Should return a 400 status if no data was passed in body.", () => {
    return request(app).post("/login").expect(400);
  });

  test("Should return a token", () => {
    return request(app)
      .post("/login")
      .send({ something: "something" })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(typeof response.body.token).toBe("string");
      });
  });
});

// Tests for countries
// Missing rate limit test
describe("Test countries endpoint", () => {
  test("Should return a 403 status if no Auth header was provided.", () => {
    return request(app).get("/countries?name=Mexico").expect(403);
  });

  test("Should return a 403 status if a wrong token was provided.", () => {
    return request(app)
      .get("/countries?name=Mexico")
      .set({ Authorization: "Bearer wrong-token" })
      .expect(403);
  });

  test("Should return a 404 error if no country exists with that name.", () => {
    return request(app)
      .post("/login")
      .send({ something: "something" })
      .then((response) => {
        const token = response.body.token;
        return token;
      })
      .then((token) => {
        return request(app)
          .get("/countries?name=NotACountry")
          .set({
            Authorization: `Bearer ${token}`,
          })
          .expect(404);
      });
  });

  test("Should return a 400 status if no name was passed.", () => {
    request(app)
      .post("/login")
      .send({ something: "something" })
      .then((response) => {
        const token = response.body.token;
        return token;
      })
      .then((token) => {
        return request(app)
          .get("/countries")
          .set({
            Authorization: `Bearer ${token}`,
          })
          .expect(400);
      });
  });

  test("Should return Mexico as a result.", () => {
    request(app)
      .post("/login")
      .send({ something: "something" })
      .then((response) => {
        const token = response.body.token;
        return token;
      })
      .then((token) => {
        return request(app)
          .get("/countries?name=Mexico")
          .set({
            Authorization: `Bearer ${token}`,
          })
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.countries[0].name).toBe("Mexico");
          });
      });
  });
});

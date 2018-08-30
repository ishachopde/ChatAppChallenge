import * as request from "supertest";
import app from "../../src/server/app";
import axios from 'axios';
const ONE_SECOND = 1000;
//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe("Api Test", () => {
    const user = {
        firstName: "integration-test",
        lastName: "integration-test",
        username: "integration-test",
        password: "integration-test",
        isSupport: true,
    };

    before(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ONE_SECOND);
        });
    });

    it("Should return react app / route", (done) => {
        request(app)
            .get("/")
            .expect(200, done);
    });

    describe("GET /random", () => {
        it("Should return 404 for unexpected route.", (done) => {
            request(app)
                .get("/random")
                .expect(401, done);
        });
    });

    describe("User login scenario", () =>  {
        let loggedInUser;
        let token;
        it("Should create test user in the system as suport", (done) => {
            request(app)
                .post("/users/register")
                .send(user)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200, done);
        });

        it("Should not register user if already present", (done) => {
            request(app)
                .post("/users/register")
                .send(user)
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(500, done);
        });
        
        it("Should be able to login to the system", (done) => {
            request(app)
                .post("/users/authenticate")
                .send({username: "integration-test", password: "integration-test",})
                .set("Accept", "application/json")
                .expect(200)
                .end((err, data) => {
                    loggedInUser = data.body;
                    token = data.body.token;
                    done();
                });
        });

        it("Should not delete the user from the system if valid token if not provided", (done) => {
            request(app)
                .delete(`/users/${loggedInUser._id}`)
                .expect(401, done);
        });

        it("Should delete the user from the system", (done) => {
            request(app)
                .delete(`/users/${loggedInUser._id}`)
                .set("Authorization", "Bearer " + token)
                .expect(200, done);
        });
    });
});
import request from "supertest";
import app from "../../index.js";
import { AppDataSource } from "../config/data-source.js";
import User from "../entities/User.js";

describe("Integration Test: POST /users", () => {
    
    beforeAll(async () => {
        await AppDataSource.initialize();
    });

    afterEach(async () => {
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.clear(); 
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("should successfully create a user and store it in the PostgreSQL database", async () => {
        const userData = {
            name: "Test User",
            email: "test@example.com"
        };

        const response = await request(app)
            .post("/users")
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(userData.name);

        const userRepository = AppDataSource.getRepository(User);
        const userInDb = await userRepository.findOneBy({ email: userData.email });

        expect(userInDb).not.toBeNull();
        expect(userInDb.name).toBe(userData.name);
    });
});
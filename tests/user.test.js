import request from "supertest";
import app from "../index.js"; // Adjust this path if necessary
import { AppDataSource } from "../src/config/data-source.js";
import User from "../src/entities/User.js";

describe("Integration Test: POST /users", () => {
    
    // MUST have async and await here
    beforeAll(async () => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    });

    // MUST have async and await here
    afterEach(async () => {
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.clear(); 
    });

    // MUST have async and await here
    afterAll(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    afterAll(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
            // Give TypeORM a half-second to finish closing its connection pool
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    });

    it("should successfully create a user", async () => {
        const userData = {
            name: "Abubakar",
            email: "abubakar@gmail.com"
        };

        // MUST have await here
        const response = await request(app)
            .post("/users")
            .send(userData);

        expect(response.status).toBe(201);
        
        // MUST have await here
        const userRepository = AppDataSource.getRepository(User);
        const userInDb = await userRepository.findOneBy({ email: userData.email });

        expect(userInDb).not.toBeNull();
        expect(userInDb.name).toBe(userData.name);
    });
});
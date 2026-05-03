import request from "supertest";
import app from "../index.js";
import { AppDataSource } from "../src/config/data-source.js";
import User from "../src/entities/User.js";

describe("Integration Test: POST /users", () => {
    
    beforeAll(async () => {
        // Only initialize if not already connected
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    });

    afterEach(async () => {
        // Ensure the data source is initialized before trying to clear
        if (AppDataSource.isInitialized) {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.clear(); 
        }
    });

    afterAll(async () => {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    // ... rest of your test


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
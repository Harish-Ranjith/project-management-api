const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Import the Express App
const User = require('../models/User');

// Connect to a TEST database before running any tests
beforeAll(async () => {
    const testURI = process.env.MONGO_URI + "_test"; // Appends _test to your DB name
    await mongoose.connect(testURI);
});

// Clear the database after every test so they are clean
afterEach(async () => {
    await User.deleteMany();
});

// Close connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Endpoints', () => {

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        // 1. Create a user manually first
        await request(app).post('/api/auth/register').send({
            username: 'loginuser',
            email: 'login@example.com',
            password: 'password123'
        });

        // 2. Try to login
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
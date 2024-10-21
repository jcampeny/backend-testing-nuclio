import {describe, test, expect, beforeAll, afterAll, beforeEach} from 'vitest';
import {MongoMemoryServer} from "mongodb-memory-server";
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';

describe('User Routes Integration Tests', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        await mongoose.connect(uri);
    });

    afterAll(async () => {
        // Desconectar y cerrar MongoDB después de las pruebas
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        // Limpiar las colecciones antes de cada prueba
        await mongoose.connection.dropDatabase();
    });

    // Pruebas para el endpoint de registro
    describe('POST /api/users/register', () => {
        test('Debería registrar un usuario y almacenarlo en la base de datos', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    firstName: 'Ana',
                    lastName: 'García',
                    email: 'ana@example.com',
                    password: 'contraseña123',
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Usuario registrado');
            expect(res.body).toHaveProperty('userId');

            // Verificar que el usuario se ha creado en la base de datos
            const User = mongoose.model('User');
            const user = await User.findOne({email: 'ana@example.com'});
            expect(user).not.toBeNull();
            expect(user.firstName).toBe('Ana');
        });

        test('No debería registrar un usuario con datos inválidos', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    firstName: '', // Nombre vacío
                    email: 'correo-no-valido', // Email inválido
                    password: '123', // Contraseña muy corta
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    // Pruebas para el endpoint de obtención del perfil
    describe('GET /api/users/me', () => {
        test('Debería obtener el perfil del usuario autenticado', async () => {
            // Registrar e iniciar sesión para obtener el token
            await request(app)
                .post('/api/users/register')
                .send({
                    firstName: 'Laura',
                    lastName: 'Martínez',
                    email: 'laura@example.com',
                    password: 'contraseña123',
                });

            const loginRes = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'laura@example.com',
                    password: 'contraseña123',
                });

            const cookies = loginRes.headers['set-cookie'];

            const res = await request(app)
                .get('/api/users/me')
                .set('Cookie', cookies);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('email', 'laura@example.com');
        });

        test('No debería acceder a un endpoint protegido sin autenticación', async () => {
            const res = await request(app).get('/api/users/me');

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('error', 'No autenticado');
        });
    });

    // Pruebas para el endpoint de inicio de sesión
    describe('POST /api/users/login', () => {
        test('Debería iniciar sesión con credenciales válidas y recibir un token JWT', async () => {
            // TODO (Tip: mira el test "GET /api/users/me" para la gestión de cookies/token)
        });

        test('No debería iniciar sesión con credenciales incorrectas', async () => {
            // TODO
        });
    });
});

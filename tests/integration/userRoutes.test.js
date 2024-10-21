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

    describe('GET /api/users/:id', () => {
        test('Debería obtener el perfil del usuario autenticado', async () => {
            // TODO
        });
    });
});

import {describe, test, expect, beforeEach, vi} from 'vitest';
import * as userService from '../../src/user/services';
import User from '../../src/user/model';

describe('User Service Unit Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('registerUser', () => {
        test('Debería registrar un nuevo usuario correctamente', async () => {
            // Mockear User.findOne para que retorne null (usuario no existe)
            vi.spyOn(User, 'findOne').mockResolvedValue(null);

            // Mockear User.prototype.save para simular el guardado del usuario
            vi.spyOn(User.prototype, 'save').mockResolvedValue({
                firstName: 'Juan',
                email: 'juan@example.com',
            });

            const userData = {
                firstName: 'Juan',
                lastName: 'Pérez',
                email: 'juan@example.com',
                password: 'contraseña123',
            };

            const user = await userService.registerUser(userData);

            expect(User.findOne).toHaveBeenCalledWith({email: userData.email});
            expect(User.prototype.save).toHaveBeenCalled();
            expect(user).toHaveProperty('firstName', 'Juan');
            expect(user).toHaveProperty('lastName', 'Pérez');
            expect(user).toHaveProperty('email', 'juan@example.com');
        });

        test('Debería lanzar un error si el usuario ya existe', async () => {
            const userData = {
                firstName: 'Juan',
                lastName: 'Pérez',
                email: 'juan@example.com',
                password: 'contraseña123',
            };

            // Configurar el mock para que encuentre un usuario existente
            vi.spyOn(User, 'findOne').mockResolvedValue(userData);
            vi.spyOn(User.prototype, 'save');

            await expect(userService.registerUser(userData)).rejects.toThrow(
                'El usuario ya está registrado'
            );

            expect(User.findOne).toHaveBeenCalledWith({email: userData.email});
            expect(User.prototype.save).not.toHaveBeenCalled();
        });
    });

    describe('getUserById', () => {
        test('Debería obtener un usuario por su ID', async () => {
            // TODO
        });

        test('Debería lanzar un error si el usuario no existe', async () => {
            // TODO
        });
    });
});

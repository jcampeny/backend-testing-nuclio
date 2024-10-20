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

    describe('loginUser', () => {
        test('Debería iniciar sesión correctamente con credenciales válidas', async () => {
            // Configurar el mock para encontrar al usuario
            vi.spyOn(User, 'findOne').mockResolvedValue({
                _id: '123',
                email: 'juan@example.com',
                password: 'hashedPassword',
                comparePassword: vi.fn().mockResolvedValue(true),
            });

            const email = 'juan@example.com';
            const password = 'contraseña123';

            const user = await userService.loginUser(email, password);

            expect(User.findOne).toHaveBeenCalledWith({email});
            expect(user).toHaveProperty('_id', '123');
            expect(user.comparePassword).toHaveBeenCalledWith(password);
        });

        test('Debería lanzar un error si el usuario no existe', async () => {
            // Configurar el mock para que no encuentre al usuario
            vi.spyOn(User, 'findOne').mockResolvedValue(null);

            const email = 'juan@example.com';
            const password = 'contraseña123';

            await expect(userService.loginUser(email, password)).rejects.toThrow(
                'Credenciales inválidas'
            );

            expect(User.findOne).toHaveBeenCalledWith({email});
        });

        test('Debería lanzar un error si la contraseña es incorrecta', async () => {
            // Configurar el mock para encontrar al usuario pero con contraseña incorrecta
            const user = {
                email: 'juan@example.com',
                comparePassword: vi.fn().mockResolvedValue(false),
            };
            vi.spyOn(User, 'findOne').mockResolvedValue(user);

            const email = 'juan@example.com';
            const password = 'contraseñaIncorrecta';

            await expect(userService.loginUser(email, password)).rejects.toThrow(
                'Credenciales inválidas'
            );

            expect(User.findOne).toHaveBeenCalledWith({email});
            expect(user.comparePassword).toHaveBeenCalledWith(password);
        });
    });

    describe('getUserById', () => {
        test('Debería obtener un usuario por su ID', async () => {
            // Configurar el mock para encontrar al usuario
            vi.spyOn(User, 'findById').mockReturnValue({
                _id: '123',
                firstName: 'Juan',
                email: 'juan@example.com'
            });

            const id = '123';
            const user = await userService.getUserById(id);

            expect(User.findById).toHaveBeenCalledWith(id);
            expect(user).toHaveProperty('_id', '123');
            expect(user).toHaveProperty('email', 'juan@example.com');
        });

        test('Debería lanzar un error si el usuario no existe', async () => {
            // Configurar el mock para que no encuentre al usuario
            vi.spyOn(User, 'findById').mockResolvedValue(null);

            const id = '123';

            await expect(userService.getUserById(id)).rejects.toThrow(
                'Usuario no encontrado'
            );

            expect(User.findById).toHaveBeenCalledWith(id);
        });
    });

    describe('updateUserImage', () => {
        test('Debería actualizar la imagen de perfil del usuario', async () => {
            // Configurar el mock para actualizar al usuario
            vi.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({
                _id: '123',
                profileImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
            });

            const id = '123';
            const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';

            const user = await userService.updateUserImage(id, imageBase64);

            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                id,
                {profileImage: imageBase64},
                {new: true},
            );
            expect(user).toHaveProperty('profileImage', imageBase64);
        });

        test('Debería lanzar un error si el usuario no existe', async () => {
            // Configurar el mock para que no encuentre al usuario
            User.findByIdAndUpdate.mockResolvedValue(null);

            const id = '123';
            const imageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';

            await expect(
                userService.updateUserImage(id, imageBase64)
            ).rejects.toThrow('Usuario no encontrado');

            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                id,
                {profileImage: imageBase64},
                {new: true},
            );
        });
    });
});

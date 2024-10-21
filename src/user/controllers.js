import {generateToken, getUserById, loginUser, registerUser, updateUserImage} from "./services.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);
        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(201).json({message: 'Usuario registrado', userId: user._id});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body;
        const user = await loginUser(email, password);
        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        res.status(200).json({message: 'Inicio de sesión exitoso'});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export async function logout(req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({message: 'Sesión cerrada exitosamente'});
}

export async function getProfile(req, res) {
    try {
        const user = await getUserById(req.userId);
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

import {registerUser} from "./services.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({message: 'Usuario registrado', userId: user._id});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

import {getUserById, registerUser} from "./services.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({message: 'Usuario registrado', userId: user._id});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export async function getUserById(req, res) {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json({user});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

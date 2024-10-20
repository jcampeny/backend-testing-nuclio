import User from "./model.js";
import jwt from "jsonwebtoken";

export async function registerUser(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error('El usuario ya está registrado');

    const user = new User(userData);
    await user.save();
    return user;
}

export async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Credenciales inválidas');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Credenciales inválidas');

    return user;
}

export function generateToken(user) {
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
}

export async function updateUserImage(id, imageBase64) {
    const user = await User.findByIdAndUpdate(
        id,
        { profileImage: imageBase64 },
        { new: true }
    );
    if (!user) throw new Error('Usuario no encontrado');
    return user;
}

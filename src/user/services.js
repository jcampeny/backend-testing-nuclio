import User from "./model.js";

export async function registerUser(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error('El usuario ya está registrado');

    const user = new User(userData);
    await user.save();
    return user;
}

export async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
}

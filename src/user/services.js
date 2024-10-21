import User from "./model.js";

export async function registerUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
}

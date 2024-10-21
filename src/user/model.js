import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: null }, // Base64 o URL
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);

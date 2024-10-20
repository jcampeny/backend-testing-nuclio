import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.empty': 'El nombre es obligatorio',
        'any.required': 'El nombre es obligatorio',
    }),
    lastName: Joi.string().allow(''),
    email: Joi.string().email().required().messages({
        'string.email': 'Debe proporcionar un email válido',
        'any.required': 'El email es obligatorio',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'La contraseña debe tener al menos 6 caracteres',
        'any.required': 'La contraseña es obligatoria',
    }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Debe proporcionar un email válido',
        'any.required': 'El email es obligatorio',
    }),
    password: Joi.string().required().messages({
        'any.required': 'La contraseña es obligatoria',
    }),
});

export const uploadImageSchema = Joi.object({
    imageBase64: Joi.string().required().messages({
        'any.required': 'La imagen es obligatoria',
    }),
});

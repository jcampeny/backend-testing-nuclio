import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No autenticado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: 'Token inválido' });
    }
}

export function requestPayloadMiddleware(schema) {
    return (req, res, next) => {
        const options = {
            abortEarly: false, // Mostrar todos los errores
            allowUnknown: true, // Permitir propiedades desconocidas
            stripUnknown: true, // Remover propiedades desconocidas
        };

        const { error, value } = schema.validate(req.body, options);
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        req.body = value;
        next();
    };
}

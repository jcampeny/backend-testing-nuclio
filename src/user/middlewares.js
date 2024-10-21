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

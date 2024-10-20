import mongoose from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

import app from "./app.js";

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
    try {
        if (isProduction) {
            await mongoose.connect(process.env.MONGODB_URI);
        } else {
            const mongo = await MongoMemoryServer.create();
            const uri = mongo.getUri();
            await mongoose.connect(uri);
        }

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

startServer();

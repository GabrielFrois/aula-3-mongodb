import express from "express";
import mongoose from "mongoose";
import path from "path";
import clienteRoutes from "./routes/clienteRoutes";


const app = express();

// Middleware para JSON
app.use (express.json());

// Conexão ao MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cadastroDB")
    .then(() => console.log ("Conectado ao MongoDB Compass"))
    .catch((erro) => console.error("Erro ao conectar:", erro));

// Rotas API
app.use("/clientes", clienteRoutes);

// Servir front-end da pasta public
app.use(express.static(path.join(__dirname, "../public")));

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
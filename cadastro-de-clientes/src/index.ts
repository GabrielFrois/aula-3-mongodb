import express  from "express";
import mongoose from "mongoose";
import path from "path";
import ClienteRoutes from "./routes/clienteRoutes";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/cadastroDB")
    .then(()=>console.log("Conectado ao MongoDB Compass"))
    .catch((erro)=>console.error("Erro ao conectar:",erro));

app.use("/clientes",ClienteRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000, ()=>{
    console.log("Servidor rodando em http://localhost:3000");
});
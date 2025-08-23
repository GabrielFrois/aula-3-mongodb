import mongoose, { Schema, Document } from "mongoose";

// Interface para definir como será a estrutura do Cliente
export interface ICliente extends Document {
    nome: string;
    email: string;
    telefone: string;
    criadoEm: Date;
}

// Define o esquema (estrutura do documento no MongoDB)
const ClientSchema: Schema = new Schema({
    nome: {type: String, required: true }, // campo obrigatório
    email: {type: String, required: true, unique: true }, // não pode repetir
    telefone: {type: String, required: true },
    criadoEm: { type: Date, default: Date.now }, // data automática
});

// Exportando o modelo para ser usado no CRUD
export default mongoose.model<ICliente>("Cliente", ClientSchema)
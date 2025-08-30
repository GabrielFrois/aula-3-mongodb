import mongoose, { Schema, Document} from "mongoose";
//interface que define como será a estrutura de um cliente 
export interface Icliente extends Document{ 
    nome: string;
    email: string;
    telefone: string;
    criadoEm: Date;
}

//Define o esquema do mongo
const ClienteSchema: Schema=new Schema({
    nome: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    telefone: { type: String, required: true},
    criadoEm: { type: Date, default: Date.now},
})

export default mongoose.model<Icliente>("Cliente",ClienteSchema);
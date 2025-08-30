import { Router, Request, Response} from "express";
import cliente from "../models/cliente";

const router = Router();

//Rota POST -> Criar novo Cliente

router.post("/", async (req: Request, res: Response)=>{
    try {
        const novoCliente = new cliente(req.body);
        const clienteSalvo= await novoCliente.save();
        res.status(201).json(clienteSalvo);
    } catch (erro: unknown){
        //tratamente seguro erro
        if (erro instanceof Error){
            res.status(400).json({erro: erro.message});
        }
        else{
            res.status(400).json({erro: String(erro)});
        }
    }
});

router.get("/", async (_req:Request, res:Response)=>{
    try {
        const clientes =await cliente.find();
        res.json(clientes);
    } catch(erro: unknown){
        if (erro instanceof Error){
            res.status(500).json({erro: erro.message});
        } else {
            res.status(500).json({ erro: String(erro)});
        }
    }
});

// Rota PUT -> Altera os dados de um cliente
router.put("/:id", async(req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const clienteAtualizado = await cliente.findByIdAndUpdate(
            id,
            req.body,
            { new:true } // devolve o cliente atualizado
        );

        if (!clienteAtualizado){
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }
        res.json(clienteAtualizado);
    } catch (erro: unknown){
        if(erro instanceof Error){
            res.status(400).json({ erro: erro.message });
        } else {
            res.status(400).json({ erro: String(erro) });
        }
    }
});

// Rota DELETE -> Excluir cliente por ID
router.delete("/:id", async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const clienteRemovido = await cliente.findByIdAndUpdate(id);

        if(!clienteRemovido){
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }

        res.json({ mensagem: "Cliente excluído com sucesso" });
    } catch (erro: unknown){
        if (erro instanceof Error){
            res.status(404).json({ erro: erro.message });
        } else{
            res.status(400).json({ erro: String(erro) });
        }
    }
});

export default router;
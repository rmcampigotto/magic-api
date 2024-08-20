import { Request, Response } from "express";
import commanderService from './commander.service';

class CommanderController {

    async findById(req: Request, res: Response) {
        try {
            const commander = await commanderService.findById(req.params.id);
            return res.status(200).json(commander);
        } catch (error) {
            return res.status(404).json(`ERRO AO BUSCAR ID [${req.params.id}]: ` + error);
        }
    }

    async findOneAndReturnCommanderId(req: Request, res: Response) {
        try {
            const commander = await commanderService.findOneAndReturnCommanderId(req.params.id);
            return res.status(200).json(commander);
        } catch (error) {
            return res.status(404).json(`ERRO AO BUSCAR ID [${req.params.id}]: ` + error);
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const consult = await commanderService.findAll();
            return res.status(200).json(consult);
        } catch (error) {
            return res.status(404).json('ERRO AO CONSULTAR COMMANDERS: ' + error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const commander = await commanderService.create(req.body);
            return res.status(200).json(commander);
        } catch (error) {
            return res.status(404).json('ERRO AO CRIAR COMMANDER: ' + error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const commander = await commanderService.updateById(req.params.id, req.body);
            return res.status(200).json(commander);
        } catch (error) {
            return res.status(404).json('ERRO AO ALTERAR COMMANDER: ' + error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await commanderService.deleteById(req.params.id)
            return res.status(200).json(`COMMANDER COM ID: [${req.params.id}] DELETADO`);
        } catch (error) {
            return res.status(404).json('ERRO AO DELETAR COMMANDER: ' + error);
        }
    }

}

export default new CommanderController()
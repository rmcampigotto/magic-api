import commanderModel from "./commander.schema";

class CommanderService {
    async create(commanderJSON: any) {
        return await commanderModel.create(commanderJSON)
    }

    async findAll() {
        return await commanderModel.find()
    }

    async findById(ID: String) {
        return await commanderModel.findOne({ commanderID: ID })
    }

    async updateById(ID: String, commanderJSON: JSON) {
        return await commanderModel.findOneAndUpdate({ commanderID: ID }, commanderJSON)
    }

    async deleteById(ID: String) {
        return await commanderModel.findOneAndDelete({ commanderID: ID })
    }
}

export default new CommanderService()
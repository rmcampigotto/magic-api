import commanderModel from "./commander.schema";
class CommanderService {
    async create(commanderJSON: any) {
        return await commanderModel.create(commanderJSON);
    }

    async findAll(){
        return await commanderModel.find();
    }

    async findById(ID: String){
        return await commanderModel.findOne({ commanderID: ID });
    }

    async findOneAndReturnCommanderId(ID: String){
        return await commanderModel.findOne({ commanderID: ID }, { _id: false, commanderID: true});
    }

    async updateById(ID: String, commanderJSON: JSON){
        return await commanderModel.findOneAndUpdate({ commanderID: ID }, commanderJSON, { new: true });
    }

    async deleteById(ID: String){
        return await commanderModel.findOneAndDelete({ commanderID: ID });
    }
}

export default new CommanderService();

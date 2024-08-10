import * as fs from 'fs';

class Utilities {

    exportJson(arquivo: object){
        const arquivoJSON = JSON.stringify(arquivo, null, 2);
        fs.writeFileSync('deck.json', arquivoJSON, 'utf-8');
    }

}

export default new Utilities();

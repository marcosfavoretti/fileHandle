import readline from 'readline';

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function pathtoFile() {//espera responder para passar o valor 
    return new Promise((resolve) => {
        input("Caminho do diretorio qua sera usado: \n")
            .then((path) => {
                resolve(path);
            });
    });
}

export function pathtonewDirectory() {//espera responder para passar o valor 
    return new Promise((resolve) => {
        input("Caminho do novo diretorio: \n")
            .then((path) => {
                resolve(path);
            });
    });
}

export function menu() {//espera responder para passar o valor 
    return new Promise((resolve) => {
        input("qual ação será feita?\n1-rename\n2-mover\n3-str arquivos\n")
            .then((path) => {
                resolve(path);
            });
    });
}


/**
 * @param {string} question 
 * @returns {Promise<string>}
 */
function input(question) {
    return new Promise((resolve) => {
        leitor.question(question, function (answer) {
            resolve(answer);
        });
    });
}
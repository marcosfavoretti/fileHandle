import { DirectoryHandle } from "./directoryHandle.js";
import { menu, pathtoFile, pathtonewDirectory } from "./input.js";
//C:\Users\marco\OneDrive\Imagens\handle-file
let controll = true
do {
    const op = await menu()
    const path = await pathtoFile();
    const directory = new DirectoryHandle(path)
    switch (Number(op)) {
        case 1:
            if (!(await directory.verifyPath())) throw new Error('O caminho não pode ser acessado');
            directory.rename_files();
            break;
        case 2:
            if (!(await directory.verifyPath())) throw new Error('O caminho não pode ser acessado');
            const newDir = await pathtonewDirectory();
            await directory.movoTo(newDir);
            break;
        case 3:
            await directory.getFiles();
            break;
        default:
            controll = false;
            if (op !== null) {
                throw new Error('Opção inválida');
            }
            break;
    }
} while (controll);




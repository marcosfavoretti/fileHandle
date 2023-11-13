import fs, { write, writeFile } from "node:fs"
import path, { relative } from "node:path"

export class DirectoryHandle {
    /**
     * @type {string}
     */
    directory_path

    /**
     * 
     * @param {string} path 
     */
    constructor(path) {
        this.directory_path = path
    }
    /**
     * 
     * @param {string} newDir 
     * @returns 
     */

    async movoTo(newDir) {
        if (!(await this.verifyPath(newDir))) throw new Error('foi passado um caminho valido')
        const searchs = await this.#readSearchFile()
        const error = []
        const data = await this.getFiles()
        for (const sucess of searchs) {
            try {
                const real_file = await this.#match(sucess.trim(), data)
                console.log("match:" + real_file)
                if (!real_file) throw new Error('nao foi possivel achar um match')
                await fs.rename(`${this.directory_path}/${real_file}`, `${newDir}/${real_file}`, (err) => { if (err) console.error(err) })
            }
            catch (er) {
                console.log(er)
                error.push(sucess)
            }
        }
        await this.#writeLog(error.join('\n'))
    }
    async #match(some_file, data) {
        try {
            const match = data.find((filt) => {
                return filt.indexOf(some_file) === 0
            })
            console.log(match)
            return match
        } catch (error) {
            console.log(error)
        }

    }
    async #writeLog(file_erro) {
        await fs.writeFile("C:\\File-Handle\\log.txt", file_erro.join('\n'), (err) => { if (err) console.log(err) })
    }

    /**
     * 
     * @returns {Array<string>}
     */

    async #readSearchFile() {
        return new Promise((resolve, reject) => {
            fs.readFile("C:\\File-Handle\\search.txt", undefined, (err, data) => {
                const lookfor = (String(data).split('\n'))
                console.log(lookfor)
                resolve(lookfor)
                if (err) console.log(err)
            })
        })
    }


    /**
     * 
     * @param {string} path 
     */

    async rename_files() {
        const files = await this.getFiles(this.directory_path)
        //console.log(files)
        let new_names = []
        for (const file of files) {
            new_names.push({ new_name: this.#nameHandle(file), og_name: file })
            // console.log(this.#nameHandle(file))
        }

        for (const name of new_names) {

            await this.#rename(name.og_name, name.new_name)


        }
    }
    async #rename(og_name, new_name) {
        await fs.rename(`${this.directory_path}/${og_name}`, `${this.directory_path}/${new_name}`, (err) => { this.#writeLog([og_name + "->" + new_name]) })
    }

    /**
     * 
     * @param {string} name_file 
     * @returns {string}
     */
    #nameHandle(name_file) {
        console.log(name_file)
        const file_extension = name_file.slice(name_file.indexOf("."))
        console.log(file_extension)
        name_file = name_file.slice(0, (name_file.length - file_extension.length))
        console.log('new name ' + name_file)
        const index = {
            idx_: name_file.indexOf("_"),
            idxparantes: name_file.indexOf("("),
            idxhashtag: name_file.indexOf("#")
        }

        if (index.idx_ !== -1) {
            const number = name_file.charAt(index.idx_ + 1)
            if (/^\d+$/.test(number)) {
                console.log("é numero isso")
            }
            else {
                name_file = name_file.slice(0, index.idx_)
            }
        }
        if (index.idxparantes !== -1) {
            name_file = `${name_file.slice(0, index.idxparantes)}`
        }
        if (index.idxhashtag !== -1) {
            name_file = `${name_file.slice(0, index.idxhashtag)}`
        }
        name_file = name_file + file_extension
        return name_file.trim()
    }





    /**
     * 
     * @param {string} path 
     * @returns {boolean}
     */

    async verifyPath() {
        try {
            await fs.promises.access(this.directory_path)
            return true
        }
        catch (err) {
            return false
        }
    }
    /**
     * 
     * @returns {Array<string>}
     */

    getFiles() {
        return new Promise((resolve, reject) => {

            fs.readdir(this.directory_path, async (err, files) => {
                if (err) {
                    reject(new Error("Erro ao ler arquivos"));
                } else {
                    await fs.writeFile("C:\\File-Handle\\fileonDir.txt", files.join('\n'), (err) => { if (err) console.log(err) })
                    resolve(files);
                }
            });
        });
    }

}










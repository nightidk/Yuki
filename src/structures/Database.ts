import { Model, Mongoose } from "mongoose";
import glob from "glob";
import { promisify } from "util";

const globPromisify = promisify(glob);

export class Database extends Mongoose {
    modelsDB: Map<string, Model<any>> = new Map();
    constructor() {
        super();
        this.#connectDatabase();
    }

    async #connectDatabase() {
        await this.connect(process.env.database).then(async () => {
            console.log(
                `Connected to database: ${this.connection.db.databaseName}`
            );
            const modelFiles = await globPromisify(
                `${__dirname.replace(/\\/g, "/")}/../schemas/*{.ts,.js}`
            );
            modelFiles.forEach(async (filePath) => {
                const model = (await import(filePath))?.default as Model<any>;

                if (!model) return;

                const modelName = filePath.split("/").at(-1).split(".")[0];

                this.modelsDB.set(modelName, model);

                console.log(`[Models] ${modelName} loaded.`);
            });
        });
    }
}

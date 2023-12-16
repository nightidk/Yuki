"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const glob_1 = tslib_1.__importDefault(require("glob"));
const util_1 = require("util");
const globPromisify = (0, util_1.promisify)(glob_1.default);
class Database extends mongoose_1.Mongoose {
    modelsDB = new Map();
    constructor() {
        super();
        this.#connectDatabase();
    }
    async #connectDatabase() {
        await this.connect(process.env.database).then(async () => {
            console.log(`Connected to database: ${this.connection.db.databaseName}`);
            const modelFiles = await globPromisify(`${__dirname.replace(/\\/g, "/")}/../schemas/*{.ts,.js}`);
            modelFiles.forEach(async (filePath) => {
                const model = (await Promise.resolve(`${filePath}`).then(s => tslib_1.__importStar(require(s))))?.default;
                if (!model)
                    return;
                const modelName = filePath.split("/").at(-1).split(".")[0];
                this.modelsDB.set(modelName, model);
                console.log(`[Models] ${modelName} loaded.`);
            });
        });
    }
}
exports.Database = Database;

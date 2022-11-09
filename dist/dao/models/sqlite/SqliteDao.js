"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqliteDao = void 0;
const validObj_1 = require("../../../libs/validObj");
class SqliteDao {
    constructor(tableName, db) {
        this.db = db;
        this.tableName = tableName;
    }
    createOne(data) {
        console.log({ data });
        if (!(0, validObj_1.validObj)(data)) {
            throw new Error("Empty data");
        }
        const date = new Date().toISOString();
        data = Object.assign({ createdAt: date, updatedAt: date }, data);
        const keys = Object.keys(data);
        const values = Object.values(data);
        return new Promise((res, rej) => {
            this.db.run(`INSERT INTO ${this.tableName}(
        ${keys.join()}
      ) VALUES (
        ${keys.map((_) => "?").join()}
      )`, values, function (err) {
                if (err) {
                    rej(err);
                }
                res(this.lastID);
            });
        });
    }
    createMany(data) {
        throw new Error("Method not implemented.");
    }
    findMany(filter) {
        console.log({ filter });
        let where = null;
        if (filter && (0, validObj_1.validObj)(filter)) {
            const keys = Object.keys(filter);
            const params = keys.map((e) => `${String(e)} = '${filter[e]}'`);
            where = `where ${params.join(" or ")}`;
        }
        const res = new Promise((res, rej) => {
            this.db.all(`select * from ${this.tableName} ${where !== null && where !== void 0 ? where : ""}`, (err, rows) => {
                if (err) {
                    rej(err);
                }
                res(rows);
            });
        });
        return res;
    }
    findOne(filter) {
        throw new Error("Method not implemented.");
    }
    updateOne(filter) {
        throw new Error("Method not implemented.");
    }
    updateMany(filter) {
        throw new Error("Method not implemented.");
    }
    deleteOne(filter) {
        throw new Error("Method not implemented.");
    }
    deleteMany(filter) {
        throw new Error("Method not implemented.");
    }
}
exports.SqliteDao = SqliteDao;

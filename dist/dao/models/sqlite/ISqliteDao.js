"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISqliteDao = void 0;
class ISqliteDao {
    createOne(data) {
    }
    createMany(data) {
        throw new Error("Method not implemented.");
    }
    findMany(filter) {
        throw new Error("Method not implemented.");
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
exports.ISqliteDao = ISqliteDao;

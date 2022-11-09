"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsDao = void 0;
const db_1 = require("../../../config/db");
const SqliteDao_1 = require("./SqliteDao");
class ProductsDao extends SqliteDao_1.SqliteDao {
    constructor() {
        super("products", (0, db_1.getSqliteDb)({ verbose: true }));
    }
}
exports.ProductsDao = ProductsDao;

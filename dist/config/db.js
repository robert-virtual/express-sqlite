"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSqliteDb = void 0;
const sqlite3_1 = __importStar(require("sqlite3"));
let db;
function getSqliteDb({ verbose }) {
    if (db) {
        return db;
    }
    if (verbose) {
        sqlite3_1.default.verbose();
    }
    db = new sqlite3_1.Database("./db/amazon.db", (err) => {
        if (err) {
            console.log(`Error: ${err}`);
        }
        console.log("connected to db");
    });
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS products(
      _id INTEGER PRIMARY KEY,
      name TEXT NOT NULL, 
      description TEXT, 
      price REAL, 
      stock INTEGER, 
      createdAt TEXT, 
      updatedAt TEXT
    )`)
            .run(`INSERT OR REPLACE INTO products(
      _id,
      name,
      description,
      price,
      stock,
      createdAt,
      updatedAt
    ) VALUES (
      1,
      'Tenis Addidad Yezzy',
      'Color naranja y verde',
      4999.99,
      100,
      datetime('now','localtime'),
      datetime('now','localtime')
    )`);
    });
    return db;
}
exports.getSqliteDb = getSqliteDb;

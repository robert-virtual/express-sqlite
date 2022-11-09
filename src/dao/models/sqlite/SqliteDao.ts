import { Database } from "sqlite3";
import { validObj } from "../../../libs/validObj";
import { IDaoBase } from "../../IDaoBase";

export abstract class SqliteDao<T> implements IDaoBase<T> {
  db: Database;
  tableName: string;
  constructor(tableName: string, db: Database) {
    this.db = db;
    this.tableName = tableName;
  }
  createOne(data: Partial<T>): Promise<number> {
    console.log({data});
    
    if (!validObj(data)) {
      throw new Error("Empty data");
    }
    const date = new Date().toISOString();
    data = { createdAt: date, updatedAt: date, ...data };
    const keys = Object.keys(data);
    const values = Object.values(data);
    return new Promise((res, rej) => {
      this.db.run(
        `INSERT INTO ${this.tableName}(
        ${keys.join()}
      ) VALUES (
        ${keys.map((_) => "?").join()}
      )`,
        values,
        function (err) {
          if (err) {
            rej(err);
          }
          res(this.lastID);
        }
      );
    });
  }
  createMany(data: T[]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  findMany(filter?: Partial<T> | undefined): Promise<T[]> {
    let where: string | null = null;
    if (filter && validObj(filter)) {
      const keys: (keyof T)[] = Object.keys(filter) as (keyof T)[];
      const params = keys.map((e) => `${String(e)} = '${filter[e]}'`);
      where = `where ${params.join(" or ")}`;
    }

    const res = new Promise<T[]>((res, rej) => {
      this.db.all(
        `select * from ${this.tableName} ${where ?? ""}`,
        (err, rows) => {
          if (err) {
            rej(err);
          }
          res(rows);
        }
      );
    });
    return res;
  }
  findOne(filter: Partial<T>): Promise<T> {
    let where: string | null = null;
    if (filter && validObj(filter)) {
      const keys: (keyof T)[] = Object.keys(filter) as (keyof T)[];
      const params = keys.map((e) => `${String(e)} = '${filter[e]}'`);
      where = `where ${params.join(" or ")}`;
    }

    const res = new Promise<T>((res, rej) => {
      this.db.get(
        `select * from ${this.tableName} ${where ?? ""}`,
        (err, rows) => {
          if (err) {
            rej(err);
          }
          res(rows);
        }
      );
    });
    return res;
  }
  updateOne(filter: Partial<T>): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  updateMany(filter: Partial<T>): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  deleteOne(filter: Partial<T>): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
  deleteMany(filter: Partial<T>): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}

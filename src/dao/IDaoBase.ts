import { Database } from "sqlite3";
import { Db } from "mongodb";

export interface IDaoBase<T> {
  db: Database | Db;
  tableName: string;
  createOne(data: Partial<T>): Promise<number | string>;
  createMany(data: Partial<T>[]): Promise<unknown>;
  findMany(filter?: Partial<T>): Promise<T[]>;
  findOne(filter: Partial<T>): Promise<T>;
  updateOne(filter: Partial<T>): Promise<unknown>;
  updateMany(filter: Partial<T>): Promise<unknown>;
  deleteOne(filter: Partial<T>): Promise<unknown>;
  deleteMany(filter: Partial<T>): Promise<unknown>;
}

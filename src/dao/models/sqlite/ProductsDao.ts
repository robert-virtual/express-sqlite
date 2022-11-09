import { getSqliteDb } from "../../../config/db";
import { IProduct } from "../entities/IProduct";
import { SqliteDao } from "./SqliteDao";

export class ProductsDao extends SqliteDao<IProduct> {
  constructor() {
    super("products", getSqliteDb({verbose:true}));
  }
}

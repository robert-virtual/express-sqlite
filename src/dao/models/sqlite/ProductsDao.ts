import { getSqliteDb } from "../../../config/db";
import { IProduct } from "../entities/IProduct";
import { SqliteDao } from "./SqliteDao";

export class ProductsDao extends SqliteDao<IProduct> {
  constructor() {
    super("products", getSqliteDb({ verbose: true }));
  }
  findOne(filter: Partial<IProduct>): Promise<IProduct> {
    filter.price = Number(filter.price)
    filter.stock = Number(filter.stock)
    filter._id = Number(filter._id)
    return super.findOne(filter)
  }
}

import { Router } from "express";
import { ProductsDao } from "../dao/models/sqlite/ProductsDao";

const router = Router();

const products = new ProductsDao();

router.get("/", async (req, res) => {
  const { name } = req.query;
  const data = await products.findMany({ name: String(name) });
  res.json({ msg: "get products", data });
});

router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  const data = await products.findOne({ _id: id });
  res.json({ msg: "get product " + id, data });
});

router.get("/one/", async (req, res) => {
  const data = await products.findOne(req.query);
  res.json({ msg: "get product ", data });
});

router.post("/", async (req, res) => {
  try {
    const _id = await products.createOne(req.body);
    res.json({ msg: "post products", data: { ...req.body, _id } });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ msg: "put product " + id });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ msg: "delete product " + id });
});
export default router;

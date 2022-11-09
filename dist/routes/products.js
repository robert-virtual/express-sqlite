"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsDao_1 = require("../dao/models/sqlite/ProductsDao");
const router = (0, express_1.Router)();
const products = new ProductsDao_1.ProductsDao();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    const data = yield products.findMany({ name: String(name) });
    res.json({ msg: "get products", data });
}));
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ msg: "get product " + id });
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = yield products.createOne(req.body);
        res.json({ msg: "post products", data: Object.assign(Object.assign({}, req.body), { _id }) });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ msg: "put product " + id });
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.json({ msg: "delete product " + id });
});
exports.default = router;

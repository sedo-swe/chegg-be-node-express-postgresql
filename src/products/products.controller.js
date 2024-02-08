/*function read(req, res, next) {
  res.json({ data: { product_title: "some product title" } });
}

function list(req, res, next) {
  res.json({
    data: [{ product_title: "product 1" }, { product_title: "product 2" }],
  });
}

module.exports = {
  read: [read],
  list: [list],
};*/
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const productsService = require("./products.service");

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

/*function read(productId) {
  return knex("products").select("*").where({ product_id: productId }).first();
}*/
async function read(req, res) {
  res.json({ data: await productsService.read(res.locals.product.product_id) });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
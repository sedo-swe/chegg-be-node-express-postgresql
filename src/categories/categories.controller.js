/*async function list(req, res, next) {
  res.json({
    data: [
      { category_name: "category 1" },
      { category_name: "category 2" },
      { category_name: "category 3" },
    ],
  });
}

module.exports = {
  list: [list],
};*/
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const categoriesService = require("./categories.service");

// async function list(req, res, next) {
//   const data = await categoriesService.list();
//   res.json({ data });
//     // .catch(next); /* Chaining catch(next) onto the promise will call next(), passing in the error. If the Knex promise does not have a catch(next) at the end, it will not correctly handle errors that occur during when running the query. */
// }
async function list(req, res, next) {
  // try {
    const data = await categoriesService.list();
    res.json({ data });
  // } catch (error) {
  //   next(error);
  // }
}


module.exports = {
  list: [asyncErrorBoundary(list)],
};
import Odoo from "../models/Odoo.js";

import { createError } from "../error.js";

// Create Odoo Product
export const addOdoo = async (req, res, next) => {
  const newProduct = new Odoo(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

// Update Odoo Product

export const updateOdoo = async (req, res, next) => {
  try {
    const product = await Odoo.findById(req.params.id);
    if (!product) return next(createError(404, "Product not found!"));

    const updatedProduct = await Odoo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// Delete  Odoo Product
export const deleteOdoo = async (req, res, next) => {
  try {
    const product = await Odoo.findById(req.params.id);
    if (!product) return next(createError(404, "Product not found!"));

    await Odoo.findByIdAndDelete(req.params.id);
    res.status(200).json("The Product has been deleted.");
  } catch (err) {
    next(err);
  }
};

// bulk update

export const updateManyOdoo = async (req, res, next) => {
  let id = req.params.id;
  const list = id.split(",");

  try {
    const updatedProducts = await Odoo.updateMany(
      { _id: { $in: list } },
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updatedProducts);
  } catch (err) {
    next(err);
  }
};

// bulk delete

export const deleteManyOdoo = async (req, res, next) => {
  let id = req.params.id;
  const list = id.split(",");

  try {
    const deletedProducts = await Odoo.deleteMany({ _id: { $in: list } });
    res.status(200).json(deletedProducts);
  } catch (err) {
    next(err);
  }
};

export const getAllOdoos = async (req, res, next) => {
  const page = req.query.page;
  const fields = {
    product_name: 1,
    cat_affigen: 1,
    buy_price: 1,
    sell_price: 1,
    size: 1,
  };
  try {
    const count = await Odoo.count();
    const currentCount = Number(page) * 100;

    if (Number(page) === 1) {
      const products = await Odoo.find({}, fields).limit(100);
      if (!products) return next(createError(404, "Products not found!"));
      const data = {
        count: count,
        // next: `http://localhost:8800/api/odoo?page=${Number(page)+1}`,
        // previous: null,
        results: products,
      };
      res.status(200).json(data);
    } else {
      if (currentCount < count) {
        const products = await Odoo.find({}, fields)
          .skip(currentCount)
          .limit(100);
        if (!products) return next(createError(404, "Products not found!"));
        const data = {
          count: count,
          // next: `http://localhost:8800/api/odoo?page=${Number(page)+1}`,
          // previous: `http://localhost:8800/api/odoo?page=${Number(page)-1}`,
          results: products,
        };
        res.status(200).json(data);
      } else {
        const data = {
          count: count,
          // next: null,
          // previous: `http://localhost:8800/api/odoo?page=${Number(page)-1}`,
          results: [],
        };
        res.status(200).json(data);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const getSomeOdoos = async (req, res, next) => {
  let data;
  try {
    const products = await Odoo.find().limit(5);
    if (!products) return next(createError(404, "Products not found!"));

    data = products;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getCatCount = async (req, res, next) => {
  const param = req.params.id.replaceAll("-", " ");
  try {
    const count = await Odoo.count({ $text: { $search: param } });
    res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const param = req.params.id.replaceAll("-", " ");
  const page = req.query.page;
  const fields = {
    product_name: 1,
    cat_affigen: 1,
    buy_price: 1,
    sell_price: 1,
    size: 1,
  };
  try {
    const count = await Odoo.count({ $text: { $search: param } });
    const currentCount = Number(page) * 100;

    if (Number(page) === 1) {
      const products = await Odoo.find(
        { $text: { $search: param } },
        fields
      ).limit(100);
      if (!products) return next(createError(404, "Products not found!"));
      const data = {
        count: count,
        // next: `http://localhost:8800/api/odoo?page=${Number(page)+1}`,
        // previous: null,
        results: products,
      };
      res.status(200).json(data);
    } else {
      if (currentCount < count) {
        const products = await Odoo.find({ $text: { $search: param } }, fields)
          .skip(currentCount)
          .limit(100);
        if (!products) return next(createError(404, "Products not found!"));
        const data = {
          count: count,
          // next: `http://localhost:8800/api/odoo?page=${Number(page)+1}`,
          // previous: `http://localhost:8800/api/odoo?page=${Number(page)-1}`,
          results: products,
        };
        res.status(200).json(data);
      } else {
        const data = {
          count: count,
          // next: null,
          // previous: `http://localhost:8800/api/odoo?page=${Number(page)-1}`,
          results: [],
        };
        res.status(200).json(data);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const getSimilars = async (req, res, next) => {
  const param = req.params.id.replaceAll("-", " ");
  try {
    const products = await Odoo.find({ $text: { $search: param } }).limit(10);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const getCountOdoo = async (req, res, next) => {
  let data;
  try {
    const users = await Odoo.count();

    data = users;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// get odoo

export const getOdoo = async (req, res, next) => {
  try {
    const product = await Odoo.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const autoCompleteSearch = async (req, res, next) => {
  const search = req.params.param.toString();

  try {
    const result1 = await Odoo.aggregate([
      {
        $search: {
          index: "liveSearch",
          compound: {
            should: [
              {
                autocomplete: {
                  query: search,
                  path: "keywords",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: search,
                  path: "product_name",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
            ],
            minimumShouldMatch: 0,
          },
        },
      },

      // rajja3 hedhi el count ye5dem
      // {
      //   $count: "count"
      // },
      // { $skip: 100 },
      { $limit: 100 },
      {
        $project: {
          product_name: 1,
          cat_affigen: 1,
          buy_price: 1,
          sell_price: 1,
          size: 1,
        },
      },
    ]);

    res.status(200).json(result1);
  } catch (error) {
    next(error);
  }
};

// export const tablesearchCount = async (req, res, next) => {
//   const search = req.params.param.toString().replaceAll("-", "");
//   const searchQuery = {
//     $search: {
//       index: "liveSearch",
//       compound: {
//         should: [
//           {
//             autocomplete: {
//               query: search,
//               path: "keywords",
//               fuzzy: {
//                 maxEdits: 1,
//               },
//             },
//           },
//           {
//             autocomplete: {
//               query: search,
//               path: "product_name",
//               fuzzy: {
//                 maxEdits: 1,
//               },
//             },
//           },
//         ],
//       },
//     },
//   };

//   try {
//     const count = await Odoo.aggregate([searchQuery, { $count: "count" }]);

//     res.status(200).json(count);
//   } catch (err) {
//     next(err);
//   }
// };

// export const tablesearch = async (req, res, next) => {
//   const id = req.params.param;
//   const search = req.params.param.toString().replace(/-/g, " ");

//   const searchQuery = {
//     $search: {
//       index: "liveSearch",
//       compound: {
//         should: [
//           {
//             autocomplete: {
//               query: search,
//               path: "product_name",
//               fuzzy: {
//                 maxEdits: 2,
//               },
//             },
//           },
//           {
//             autocomplete: {
//               query: search,
//               path: "keywords",
//               fuzzy: {
//                 maxEdits: 2,
//               },
//             },
//           },
//         ],
//       },
//     },
//   };

//   try {
//     const products = await Odoo.aggregate([
//       searchQuery,
//       { $limit: 1000 },

     
//       {
//         $project: {
//           product_name: 1,
//           keywords: 1,
//           cat_affigen: 1,
//           buy_price: 1,
//           sell_price: 1,
//           size: 1,
//           score: { $meta: "searchScore" },
//         },
//       },
//       { $sort: { score: -1 } },
//     ]);
//     if (!products) return next(createError(404, "Products not found!"));

//     res.status(200).json(products);
//   } catch (err) {
//     next(err);
//   }
// };

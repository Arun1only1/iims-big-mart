import express from "express";
import mongoose from "mongoose";
import Product from "./product.model.js";

// create backend app
const app = express();

// to make app understand json
app.use(express.json());

// database connect
const dbConnect = async () => {
  try {
    // bring your own url here
    const url =
      "mongodb+srv://iims:iims123@school.b5lva.mongodb.net/big-mart?retryWrites=true&w=majority&appName=School";

    await mongoose.connect(url);

    console.log("DB connection successful...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

dbConnect();

// routes/api
// add product
app.post("/product/add", async (req, res) => {
  // extract new product from req.body
  const newProduct = req.body;

  await Product.create(newProduct);

  return res.status(201).send({ message: "Product is added successfully." });
});

// list product
app.get("/product/list", async (req, res) => {
  const products = await Product.find();

  return res.status(200).send({ message: "success", productList: products });
});

//  delete product by id
app.delete("/product/delete/:id", async (req, res) => {
  //   extract product id from req.params
  const productId = req.params.id;

  //   should be a valid mongo id
  const isValidId = mongoose.isValidObjectId(productId);

  //   if not valid object id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid object id." });
  }

  //   find product
  const product = await Product.findOne({ _id: productId });

  //   if not product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  //   delete product
  await Product.deleteOne({ _id: productId });

  //   send res
  return res.status(200).send({ message: "Product is deleted successfully." });
});

// get product details
app.get("/product/detail/:id", async (req, res) => {
  // extract product id from req.params
  const productId = req.params.id;

  // check mongo id validity
  const isValidProductId = mongoose.isValidObjectId(productId);

  // if not valid product id, throw error
  if (!isValidProductId) {
    return res.status(400).send({ message: "Invalid product id." });
  }

  // find product using product id
  const product = await Product.findOne({ _id: productId });

  // if not product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  return res.status(200).send({ message: "success", productDetails: product });
});

// network port
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

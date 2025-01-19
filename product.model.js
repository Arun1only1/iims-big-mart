import mongoose from "mongoose";

// we are going to create a table
// table has field:
// 1. name => string
// 2. price => number
// 3. brand => string
// 4. freeShipping => boolean

// schema => rule,
// { name:"Detergent",price:500,brand:"Ariel",freeShipping:false}

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  freeShipping: Boolean,
});

// create table/model/collection/entity
const Product = mongoose.model("Product", productSchema);

export default Product;

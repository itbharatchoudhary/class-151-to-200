import mongoose from "mongoose";
import priceSchema from "../model/price.schema.js";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  price: {
    type: priceSchema,
    required: true
  },
  images: [
    {
      url: String
    }
  ],
  variants: [
    {
      images: [
        {
          url: {
            type: String,
            required: true
          }
        }
      ],

      stock: {
        type: Number,
        default: 0
      },

      attributes: {
        type: Map,
        of: String
      },
      price: {
        type: priceSchema,
        required: true
      }
    }
  ]
}, { timestamps: true });

const ProductModel = mongoose.model("product", productSchema);

export default ProductModel;

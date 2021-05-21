const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the Product Name"],
    trim: true,
    maxLength: [100, "Procut Name is Too lengthy"],
  },
  description: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  sku: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "please enter the price"],
  },
  tags: [{ type: String }],
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  isPremium: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  saleFrom: {
    type: Date,
  },
  saleTo: {
    type: Date,
  },
  salePrice: {
    type: Number,
  },

  shot: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },

  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  productInfo: [
    {
      title: {
        type: String,
        required: [true, "Please enter the title"],
      },
      desc: {
        type: String,
        required: [true, "please enter description"],
      },
    },
  ],

  stock: {
    type: Number,
    required: [true, "please enter the stock"],
    maxLength: [5, "stock cannot exceed 5 charactors"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        res: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    res: "User",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

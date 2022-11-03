const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    tim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  
  rating: {
    type: Number,
    default: 0,
  },

  //should be array of object
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
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
    //here enum can used to specify the possible product categories, we will handle from the frontend here
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    //normally stock does exceed the count of 1000, 3 characters enough for that, here 10000 is the limit
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  //array of object
  reviews: [
    {
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
        //person giving reviewshould write description as well
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

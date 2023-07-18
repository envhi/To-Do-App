const mongoose = require("../db/conn");
const { Schema } = mongoose;

const ToDo = mongoose.model(
  "ToDo",
  new Schema(
    {
      todotitle: {
        type: String,
        required: true,
      },

      todocategory: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
      },
      user: Object,
    },
    { timestamps: true }
  )
);

module.exports = ToDo;

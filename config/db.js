const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGOO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;

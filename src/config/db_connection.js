const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true, // string url parser
    useUnifiedTopology: true, // new mongodb engine
    useFindAndModify: false,
  })
  .then((_) => {
    console.log(`Connection to database(${process.env.DB_NAME}) successful.`);
  })
  .catch((err) => {
    console.log(
      `Connection to database(${process.env.DB_NAME}) failed. Error: `,
      err
    );
  });
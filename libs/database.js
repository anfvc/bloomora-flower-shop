import mongoose from "mongoose";

async function connection() {

  //* Register connection events:
  mongoose.connection.on("connected", () =>
    console.log("Database has been connected.")
  );

  mongoose.connection.on("error", (error) =>
    console.log("Database encountered an error", error)
  );

  //* Connection to bloomora database using MONGO_URL
  mongoose.connect(process.env.MONGO_URL);
}

export default connection;

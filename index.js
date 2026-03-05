import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./src/infrastructure/database/dbConnection.js";
import {
  connectProducer,
  disconnectProducer,
} from "./src/infrastructure/kafka/producers/producer.js";
import {
  startConsumer,
  disconnectConsumer,
} from "./src/infrastructure/kafka/consumers/consumer.js";
import router from "./src/presentation/routers/activityLog.router.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function start() {
  await dbConnect();

  await connectProducer();

  await startConsumer();

  app.use("/api", router);
  app.use("/",(req, res) => {
    res.status(404).json({ message: "url not found" });
  });

  app.listen(port, () => console.log(`app listening on port ${port}!`));
}

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await disconnectProducer();
  await disconnectConsumer();
  process.exit(0);
});

await start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});

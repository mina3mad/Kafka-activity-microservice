import { Kafka } from "kafkajs";
import ActivityLogModel from "../../database/models/Activitylog.model.js";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID_CONSUMER,
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

//init consumer
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || "activity-consumer-group",
    maxBytesPerPartition: 1048576,
});
let isConnected = false;

const connectConsumer = async () => {
  if (!isConnected) {
    await consumer.connect();
    console.log("Kafka Consumer connected successfully");
    isConnected = true;
  }
};

//start listiningn to messages 
export const startConsumer = async () => {
  await connectConsumer();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC,
    fromBeginning: true,
  }); //to consume old messages before consumer starts

  console.log(`Consumer Subscribed to topic ${process.env.KAFKA_TOPIC}`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const event = JSON.parse(message.value.toString());

        console.log(`Received message from partition ${partition}:`, event);

        await ActivityLogModel.insertOne(event);

      } catch (error) {
        console.error("Error processing message:", error.message);
      }
    },
  });
};


export const disconnectConsumer = async () => {
  if (isConnected) {
    await consumer.disconnect();
    console.log("Consumer disconnected Successfully");
    isConnected = false;
  }
}
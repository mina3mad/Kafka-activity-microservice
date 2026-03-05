import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID_PRODUCER,
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

//init producer
const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner
});
let isConnected = false;

export const connectProducer = async () => {
  if (!isConnected) {
    await producer.connect();
    console.log("Kafka Producer connected successfully");
    isConnected = true;
  }
};

export const sendMessage = async (message) => {
  try {
    if (!isConnected) throw new Error("Producer not connected");
    await producer.send({
      topic: process.env.KAFKA_TOPIC ,
      messages: [
        {
          // Key = userId so events from the same user go to same partition (ordering)
          key: message.userId,
          value: JSON.stringify(message),
        },
      ],
    });
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const disconnectProducer = async () => {
  if (isConnected) {
    await producer.disconnect();
    console.log("Consumer disconnected Successfully");
    isConnected = false;
  }
};

import { sendMessage } from "../../infrastructure/kafka/producers/producer.js";
import QueryBuilder from "../utils/QueryBuilder.js";
import ActivityLogModel from './../../infrastructure/database/models/Activitylog.model.js';


export const save = async (req, res, next) => {
    try {
    const { userId, action, metadata } = req.body;

    if (!userId || !action) {
      return res.status(400).json({
        message: "userId and action are required",
      });
    }
    //send message to kafka
    await sendMessage({ userId, action, metadata });

    res.status(201).json({
      message: "Event published to Kafka successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export const getAllLogs = async (req, res, next) => {
    try {
        let query=new QueryBuilder(ActivityLogModel.find(),req.query).search().filter().sort().fields().pagination();
        const logs=await query.mongooseQuery;
        res.status(200).json({
            message:"Logs retrieved successfully",
            logs
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

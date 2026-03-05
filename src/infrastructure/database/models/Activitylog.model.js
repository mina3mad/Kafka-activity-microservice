import mongoose, { Schema } from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    action: {
      type: String,
      required: true,
      index: true,
      enum: ["LOGIN", "LOGOUT", "PAGE_VIEW", "CLICK", "PURCHASE", "SEARCH"],
    },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: -1 });

const ActivityLogModel = mongoose.model("ActivityLogModel", activityLogSchema);
export default ActivityLogModel;

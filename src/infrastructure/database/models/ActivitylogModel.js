import mongoose from "mongoose";

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
    // status: {
    //   type: String,
    //   required: true,
    //   index: true,
    //   enum: ["pending", "processed", "failed"],
    //   default: "pending",
    // },
    processedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

activityLogSchema.index({ userId: 1, createdAt: -1 });

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;

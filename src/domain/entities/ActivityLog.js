export class ActivityLog {
  constructor({ userId, action, metadata = {}, processedAt = new Date() }) {

    // Simple validation — every log must have a userId and an action
    if (!userId) throw new Error("userId is required");
    if (!action) throw new Error("action is required");

    this.userId = userId;
    this.action = action;       // Like => "LOGIN", "PURCHASE", "PAGE_VIEW" ,..etc
    this.metadata = metadata;   // any extra information like (page viewed: "/home")
  }
}
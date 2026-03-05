import Joi from "joi";

export const activityLogSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      "any.required": "User ID is required",
      "string.empty": "User ID cannot be empty",
      "string.base": "User ID must be a string",
    }),

  action: Joi.string()
    .valid("LOGIN", "LOGOUT", "PAGE_VIEW", "CLICK", "PURCHASE", "SEARCH")
    .required()
    .messages({
      "any.required": "Action is required",
      "string.base": "Action must be a string",
      "any.only": "Action must be one of LOGIN, LOGOUT, PAGE_VIEW, CLICK, PURCHASE, SEARCH",
    }),

  metadata: Joi.object()
    .optional()
    .messages({
      "object.base": "Metadata must be an object",
    }),
});


export const logQuerySchema = Joi.object({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  sort: Joi.string(),
  fields: Joi.string(),
})
.unknown(true);
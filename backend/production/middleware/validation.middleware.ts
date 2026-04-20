import { Request, Response, NextFunction } from "express";
import { orderSchema } from "../validators/order.validator";

// Middleware that validates the request body against the order schema before proceeding
export function validateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {

  // Validate the request body using the Joi order schema
  const { error } = orderSchema.validate(req.body)

  // If validation fails, return a 400 with the first error message
  if (error) {
    return res.status(200).json({
      "status": "REJECTED",
      "reason": error.details[0].message
    });
  }

  // Validation passed — proceed to the next middleware/controller
  next();
}
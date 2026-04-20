/* Import Joi for schema-based request body validation */
import Joi from "joi"

/* Defines the validation schema for an order request body */
export const orderSchema = Joi.object({
	/* "items" must be a non-empty array of objects, each with a required string id and quantity >= 1 */
	items: Joi.array()
	.items(
		Joi.object({
		id: Joi.string().required(),
		quantity: Joi.number().min(1).required()
		})
	)
	.min(1)
	.required(),
	/* "customer" object with required name and a valid email address */
	customer: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required()
	})
});
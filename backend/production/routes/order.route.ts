import express, { Application } from "express";
import { createOrder } from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateOrder } from "../middleware/validation.middleware";

/* Registers order-related routes on the Express application */
export default ( App: Application ) => {
	/* POST /orders — authenticate, validate the body, then create the order */
	App.post(
		"/orders",
		authMiddleware,
		validateOrder,
		createOrder
	);
}
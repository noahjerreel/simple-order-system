import { Request, Response } from "express"
import { processOrder } from "../services/order.service"

/* Controller that handles POST /orders — delegates to the order service and returns the result */
export function createOrder(req: Request, res: Response) {
    /* Pass the request body to the service layer for processing */
    const result = processOrder(req.body);

    /* Send the order processing result back to the client */
    res.json(result);
}
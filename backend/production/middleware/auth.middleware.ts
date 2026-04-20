import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../helpers/security.helper"

/* Middleware that protects routes by requiring a valid Bearer token in the Authorization header */
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
	/* Extract the Authorization header from the incoming request */
	const auth = req.headers.authorization;

	/* If no Authorization header is present, reject with 401 */
	if (!auth) {
		return res.status(401).json({ message: "Missing token" });
	}

	/* Extract the token from the "Bearer <token>" format */
	const token = auth.split(" ")[1];

	try {
		/* Verify the token; if valid, proceed to the next middleware/controller */
		verifyToken(token);
		next();
	} catch (error){
		console.log(error)
		/* If token verification fails, reject with 401 */
		return res.status(401).json({ message: "Invalid token" });
	}
}
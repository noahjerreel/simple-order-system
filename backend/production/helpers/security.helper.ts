/* Import the jsonwebtoken library for creating and verifying JWTs */
import { ENV_CONSTANT } from "../../configs/constants/app.constant";
import { string } from "joi";
import jwt from "jsonwebtoken"

/* Generates a JWT token for the "order-client" service, valid for 1 hour */
export function generateToken() {
	return jwt.sign({ service: "order-client" },
		ENV_CONSTANT.AUTH_JWT_SECRET_TOKEN as string,
		{ expiresIn: "1h" }
	);
}

/* Verifies a given JWT token against the secret key; throws if invalid or expired */
export function verifyToken(token: string) {
	return jwt.verify(token, ENV_CONSTANT.AUTH_JWT_SECRET_TOKEN as string);
}
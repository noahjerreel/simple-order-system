/* Lookup table mapping item IDs to their unit prices */
const prices: Record<string, number> = {
  item_1: 1000,
  item_2: 2000,
  item_3: 1200
}

/* Maximum allowed order total; orders exceeding this are rejected */
const LIMIT = 50000;

/* Processes an order: calculates the total, generates an order ID, and returns the result */
export function processOrder(order: any) {
	let total = 0;

	/* Sum up the cost of each item based on its price and quantity */
	for (const item of order.items) {
		const price = Math.random() * (300 - 10) + 10;
		total += price * item.quantity;
	}

	console.log(total)

	/* Generate a random order ID */
	const orderId = "ord_" + Math.floor(Math.random() * 10000);

	/* Reject the order if the total exceeds the limit */
	if (total > LIMIT) {
		return {
			orderId,
			status: "REJECTED",
			reason: "ORDER_TOTAL_TOO_HIGH"
		};
	}

	/* Return the confirmed order with its total */
	return {
		orderId,
		status: "CONFIRMED",
		total: Math.floor(total)
	};
}
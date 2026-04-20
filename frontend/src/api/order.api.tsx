import { OrderRequest, OrderResponse } from "../types"
import { generateToken } from "../helpers/security.helper"

const API_URL = "http://localhost:3001/orders"

export async function submitOrder(
  order: OrderRequest
): Promise<OrderResponse> {

  const token = await generateToken()

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(order)
  })

  if (!response.ok) {
    throw new Error("Request failed")
  }

  return response.json()
}
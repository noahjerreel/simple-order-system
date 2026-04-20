export interface Item {
  id: string
  quantity: number
}

export interface Customer {
  name: string
  email: string
}

export interface OrderRequest {
  items: Item[]
  customer: Customer
}

export interface OrderResponse {
  orderId: string
  status: "CONFIRMED" | "REJECTED"
  total?: number
  reason?: string
}
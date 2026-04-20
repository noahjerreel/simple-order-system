import { useState } from "react"
import { submitOrder } from "./api/order.api"
import { Item, OrderResponse } from "./types"

export default function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [items, setItems] = useState<Item[]>([
    { id: "", quantity: 1 }
  ])

  const [loading, setLoading] = useState(false)
  const [result, setResult] =
    useState<OrderResponse | null>(null)

  const [error, setError] = useState<string | null>(null)

  function updateItem(
    index: number,
    field: keyof Item,
    value: string | number
  ) {

    const updated = [...items]

    updated[index] = {
      ...updated[index],
      [field]: value
    }

    setItems(updated)
  }

  function addItem() {

    setItems([
      ...items,
      { id: "", quantity: 1 }
    ])
  }

  function removeItem(index: number) {

    const updated = items.filter(
      (_, i) => i !== index
    )

    setItems(updated)
  }

  async function handleSubmit() {

    setLoading(true)
    setError(null)
    setResult(null)

    try {

      const order = {
        customer: { name, email },
        items
      }

      const response = await submitOrder(order)

      setResult(response)

    } catch (e: any) {

      setError(e.message)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div style={{ padding: 40, fontFamily: "Arial" }}>

      <h2>Create Order</h2>

      <div>
        <input
          placeholder="Customer Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Customer Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <h3>Items</h3>

      {items.map((item, index) => (

        <div key={index}
          style={{ marginBottom: 10 }}>

          <input
            placeholder="Item ID"
            value={item.id}
            onChange={e =>
              updateItem(
                index,
                "id",
                e.target.value
              )
            }
          />

          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={e =>
              updateItem(
                index,
                "quantity",
                Number(e.target.value)
              )
            }
          />

          <button
            onClick={() =>
              removeItem(index)
            }
          >
            Remove
          </button>

        </div>

      ))}

      <button onClick={addItem}>
        Add Item
      </button>

      <br />
      <br />

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : "Submit Order"}
      </button>

      {error && (

        <div
          style={{
            marginTop: 20,
            color: "red"
          }}
        >
          Error: {error}
        </div>

      )}

      {result && (

        <div
          style={{
            marginTop: 20,
            background: "#eee",
            padding: 20
          }}
        >

          <h3>Order Result</h3>

          <pre>
            {JSON.stringify(
              result,
              null,
              2
            )}
          </pre>

        </div>

      )}

    </div>
  )
}
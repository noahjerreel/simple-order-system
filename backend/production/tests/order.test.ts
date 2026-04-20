import request from "supertest"
import { expect } from "chai"
import app from "../../server"
import "mocha"
import { generateToken } from "../helpers/security.helper"

describe("POST /orders API", () => {

  const token = generateToken();

  /*
  ----------------------------
  POSITIVE TEST CASES
  ----------------------------
  */

  it("POSITIVE: should confirm valid order", async () => {

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [
          { id: "item_1", quantity: 2 }
        ],
        customer: {
          name: "Jane Doe",
          email: "jane@example.com"
        }
      })

    expect(res.status).to.equal(200)
    expect(res.body.status).to.equal("CONFIRMED")
    expect(res.body.total).to.be.a("number")
  })


  it("POSITIVE: should confirm order with multiple items", async () => {

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [
          { id: "item_1", quantity: 1 },
          { id: "item_3", quantity: 2 }
        ],
        customer: {
          name: "John Doe",
          email: "john@example.com"
        }
      })

    expect(res.status).to.equal(200)
    expect(res.body.status).to.equal("CONFIRMED")
  })


  it("POSITIVE: should reject order when total exceeds limit", async () => {

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [
          { id: "item_2", quantity: 5 }
        ],
        customer: {
          name: "Jane Doe",
          email: "jane@example.com"
        }
      })

    expect(res.status).to.equal(200)
    expect(res.body.status).to.equal("REJECTED")
    expect(res.body.reason).to.equal("ORDER_TOTAL_TOO_HIGH")
  })


  /*
  ----------------------------
  NEGATIVE TEST CASES
  ----------------------------
  */


  it("NEGATIVE: should fail when JWT token is missing", async () => {

    const res = await request(app)
      .post("/orders")
      .send({
        items: [{ id: "item_1", quantity: 1 }],
        customer: {
          name: "Jane Doe",
          email: "jane@example.com"
        }
      })

    expect(res.status).to.equal(401)
  })


  it("NEGATIVE: should fail when items array is empty", async () => {

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [],
        customer: {
          name: "Jane Doe",
          email: "jane@example.com"
        }
      })

    expect(res.status).to.equal(400)
  })


  it("NEGATIVE: should fail when email is invalid", async () => {

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [{ id: "item_1", quantity: 1 }],
        customer: {
          name: "Jane Doe",
          email: "invalid-email"
        }
      })

    expect(res.status).to.equal(400)
  })

})
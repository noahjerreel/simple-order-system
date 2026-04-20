const SECRET = process.env.REACT_APP_AUTH_JWT_SECRET_TOKEN as string

function base64UrlEncode(input: ArrayBuffer | string): string {
  const bytes =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : new Uint8Array(input)

  let binary = ""
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

async function signHS256(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(data)
  )
  return base64UrlEncode(signature)
}

export async function generateToken(
  payload: Record<string, unknown> = { service: "order-client" },
  expiresInSeconds: number = 3600
): Promise<string> {
  if (!SECRET) {
    throw new Error("REACT_APP_AUTH_JWT_SECRET_TOKEN is not set")
  }

  const header = { alg: "HS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const body = { ...payload, iat: now, exp: now + expiresInSeconds }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(body))
  const signingInput = `${encodedHeader}.${encodedPayload}`
  const signature = await signHS256(signingInput, SECRET)

  return `${signingInput}.${signature}`
}

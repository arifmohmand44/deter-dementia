import pg from "pg"
import { randomUUID } from "crypto"
import { SCHEMA_NAME } from "./db-init.js"

// Create a pool for better performance with multiple connections
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
})

// Set the search_path for all connections from the pool
pool.on("connect", (client) => {
    client.query(`SET search_path TO ${SCHEMA_NAME}, public;`)
})

// Helper function to generate UUIDs in JavaScript
export function generateUUID() {
    return randomUUID()
}

// Helper function to execute queries with proper error handling
export async function query(text, params = []) {
    const client = await pool.connect()
    try {
        // Set search path for this connection
        await client.query(`SET search_path TO ${SCHEMA_NAME}, public;`)

        const result = await client.query(text, params)
        return result
    } finally {
        client.release()
    }
}

// Helper function to insert a user with proper UUID handling
export async function createUser(userData) {
    // Generate UUID in JavaScript
    const id = generateUUID()

    const { firstName, lastName, email, password, phone, image } = userData
    const name = `${firstName} ${lastName}`

    const text = `
    INSERT INTO "users" (
      "id", "firstName", "lastName", "name", "email", "password", "phone", "image"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `
    const values = [id, firstName, lastName, name, email, password, phone || null, image || null]

    const result = await query(text, values)
    return result.rows[0]
}

// Helper function to find a user by email
export async function getUserByEmail(email) {
    const text = `SELECT * FROM "users" WHERE "email" = $1`
    const result = await query(text, [email])
    return result.rows[0]
}

// Helper function to find a user by ID
export async function getUserById(id) {
    const text = `SELECT * FROM "users" WHERE "id" = $1`
    const result = await query(text, [id])
    return result.rows[0]
}

// Helper function to create a session
export async function createSession(userId, sessionToken, expires) {
    const text = `
    INSERT INTO "sessions" ("userId", "sessionToken", "expires")
    VALUES ($1, $2, $3)
    RETURNING *
  `
    const values = [userId, sessionToken, expires]

    const result = await query(text, values)
    return result.rows[0]
}

// Helper function to get a session by token
export async function getSessionByToken(sessionToken) {
    const text = `SELECT * FROM "sessions" WHERE "sessionToken" = $1`
    const result = await query(text, [sessionToken])
    return result.rows[0]
}

// Helper function to delete a session
export async function deleteSession(sessionToken) {
    const text = `DELETE FROM "sessions" WHERE "sessionToken" = $1`
    await query(text, [sessionToken])
}

// Export the pool for direct access if needed
export { pool }
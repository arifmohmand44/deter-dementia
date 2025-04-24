import pg from "pg"
import { randomUUID } from "crypto" // Node.js built-in for UUID generation

// Define the schema name to use
const SCHEMA_NAME = "public"

export async function initializeDatabase() {
    const { Client } = pg
    let client
    let usingCustomSchema = false

    try {
        // Connect to PostgreSQL
        client = new Client({
            connectionString: process.env.DATABASE_URL,
        })

        await client.connect()
        console.log("Connected to PostgreSQL database")

        // Try to grant permissions on public schema
        try {
            await client.query(`GRANT ALL ON SCHEMA public TO ${process.env.PGUSER};`)
            console.log("Granted all permissions on public schema to current user")
        } catch (grantError) {
            console.warn("Could not grant permissions on public schema:", grantError.message)
            console.warn("This is normal if your database user doesn't have admin privileges")
        }

        // We'll always use JavaScript UUID generation for simplicity and reliability
        console.log("Using JavaScript UUID generation for all database operations")

        // Define the ID column type - no default value as we'll generate UUIDs in JavaScript
        const idColumnDef = `"id" TEXT PRIMARY KEY`

        // Prefix for table names if using custom schema
        const tablePrefix = usingCustomSchema ? `${SCHEMA_NAME}.` : ""

        // Create users table
        await client.query(`
      CREATE TABLE IF NOT EXISTS ${tablePrefix}"users" (
        ${idColumnDef},
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "phone" TEXT,
        "password" TEXT,
        "emailVerified" TIMESTAMP,
        "image" TEXT,
        "firstLogin" BOOLEAN DEFAULT FALSE,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `)

        // Create accounts table
        await client.query(`
      CREATE TABLE IF NOT EXISTS ${tablePrefix}"accounts" (
        "provider" TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "refresh_token" TEXT,
        "access_token" TEXT,
        "expires_at" INTEGER,
        "token_type" TEXT,
        "scope" TEXT,
        "id_token" TEXT,
        "session_state" TEXT,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        
        PRIMARY KEY ("provider", "providerAccountId"),
        FOREIGN KEY ("userId") REFERENCES ${tablePrefix}"users"("id") ON DELETE CASCADE
      );
    `)

        // Create sessions table
        await client.query(`
      CREATE TABLE IF NOT EXISTS ${tablePrefix}"sessions" (
        "sessionToken" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "expires" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY ("userId") REFERENCES ${tablePrefix}"users"("id") ON DELETE CASCADE
      );
    `)

        // Create verification_tokens table
        await client.query(`
      CREATE TABLE IF NOT EXISTS ${tablePrefix}"verification_tokens" (
        "identifier" TEXT NOT NULL,
        "token" TEXT NOT NULL,
        "expires" TIMESTAMP NOT NULL,
        
        PRIMARY KEY ("identifier", "token")
      );
    `)

        // Create authenticators table for WebAuthn
        await client.query(`
      CREATE TABLE IF NOT EXISTS ${tablePrefix}"authenticators" (
        "credentialID" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "providerAccountId" TEXT NOT NULL,
        "credentialPublicKey" TEXT NOT NULL,
        "counter" INTEGER NOT NULL,
        "credentialDeviceType" TEXT NOT NULL,
        "credentialBackedUp" BOOLEAN NOT NULL,
        "transports" TEXT,
        
        PRIMARY KEY ("userId", "credentialID"),
        UNIQUE ("credentialID"),
        FOREIGN KEY ("userId") REFERENCES ${tablePrefix}"users"("id") ON DELETE CASCADE
      );
    `)

        // Create indexes for better performance
        await client.query(`CREATE INDEX IF NOT EXISTS "accounts_userId_idx" ON ${tablePrefix}"accounts"("userId");`)
        await client.query(`CREATE INDEX IF NOT EXISTS "sessions_userId_idx" ON ${tablePrefix}"sessions"("userId");`)
        await client.query(
            `CREATE INDEX IF NOT EXISTS "authenticators_userId_idx" ON ${tablePrefix}"authenticators"("userId");`,
        )

        // Create trigger function for updating the "updatedAt" timestamp
        await client.query(`
      CREATE OR REPLACE FUNCTION ${tablePrefix}update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
         NEW."updatedAt" = CURRENT_TIMESTAMP;
         RETURN NEW;
      END;
      $$ language 'plpgsql';
    `)

        // Apply the trigger to all tables with updatedAt
        await client.query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON ${tablePrefix}"users";
      CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON ${tablePrefix}"users"
      FOR EACH ROW
      EXECUTE FUNCTION ${tablePrefix}update_updated_at_column();
    `)

        await client.query(`
      DROP TRIGGER IF EXISTS update_accounts_updated_at ON ${tablePrefix}"accounts";
      CREATE TRIGGER update_accounts_updated_at
      BEFORE UPDATE ON ${tablePrefix}"accounts"
      FOR EACH ROW
      EXECUTE FUNCTION ${tablePrefix}update_updated_at_column();
    `)

        await client.query(`
      DROP TRIGGER IF EXISTS update_sessions_updated_at ON ${tablePrefix}"sessions";
      CREATE TRIGGER update_sessions_updated_at
      BEFORE UPDATE ON ${tablePrefix}"sessions"
      FOR EACH ROW
      EXECUTE FUNCTION ${tablePrefix}update_updated_at_column();
    `)

        console.log("Database tables initialized successfully")

        // Save schema information for other modules to use
        if (usingCustomSchema) {
            console.log(`\nIMPORTANT: Using custom schema "${SCHEMA_NAME}" for all database objects.`)
            console.log(`Make sure to set search_path to "${SCHEMA_NAME}, public" in your database connections.`)
        }

        console.log("\nIMPORTANT: Using JavaScript UUID generation for all database operations.")
        console.log("You must generate UUIDs in your application code before inserting records.")
        console.log("Example code for generating UUIDs in Node.js:")
        console.log("  import { randomUUID } from 'crypto';")
        console.log("  const id = randomUUID();")

        // Return information about the database setup
        return {
            usingCustomSchema,
            schemaName: usingCustomSchema ? SCHEMA_NAME : "public",
            usingJavaScriptUUID: true,
        }
    } catch (error) {
        console.error("Database initialization failed:", error)

        // Provide more helpful error messages for common issues
        if (error.message && error.message.includes("permission denied")) {
            console.error("\nPERMISSION ERROR: Your database user doesn't have sufficient privileges.")
            console.error("Options to fix this:")
            console.error("1. Use a database user with more privileges")
            console.error("2. Ask your database administrator to grant necessary privileges")
            console.error(
                "3. For Neon, Supabase, or other hosted services, check their documentation for permission settings",
            )

            if (error.message.includes("schema public")) {
                console.error("\nSpecific issue: Cannot create objects in the public schema.")
                console.error("This is common with managed database services.")
                console.error("Try running this command in your database's SQL editor or admin panel:")
                console.error(`CREATE SCHEMA app_schema; GRANT ALL ON SCHEMA app_schema TO ${process.env.PGUSER};`)
            }
        }

        throw error
    } finally {
        if (client) await client.end()
    }
}

// Export a helper function for UUID generation
export function generateUUID() {
    return randomUUID()
}

// Export the schema name for other modules to use
export { SCHEMA_NAME }
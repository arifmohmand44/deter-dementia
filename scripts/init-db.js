import { initializeDatabase } from "../src/lib/db-init.js"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

/**
 * Initialize the database with proper error handling
 */
async function runDatabaseInitialization() {
    console.log("Starting database initialization...")

    try {
        // Verify required environment variables
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL environment variable not set")
        }

        console.log("PostgreSQL connection string verified")

        // Check if this might be a managed database service
        const dbUrl = process.env.DATABASE_URL.toLowerCase()
        if (dbUrl.includes("neon.tech") || dbUrl.includes("supabase") || dbUrl.includes("render.com")) {
            console.log("Detected managed PostgreSQL service. Some services have restricted permissions.")
            console.log("Will attempt to create and use a custom schema instead of public schema.")
        }

        // Track start time for performance logging
        const startTime = Date.now()

        // Initialize the database
        const dbInfo = await initializeDatabase()

        // Calculate and log execution time
        const executionTime = ((Date.now() - startTime) / 1000).toFixed(2)
        console.log(`✅ Database initialized successfully in ${executionTime}s`)

        // Display schema information
        if (dbInfo && dbInfo.usingCustomSchema) {
            console.log(`\nDatabase objects created in schema: ${dbInfo.schemaName}`)
            console.log("Remember to use this schema in your application connections")
        }

        return process.exit(0)
    } catch (error) {
        console.error("❌ Database initialization failed:")

        if (error instanceof Error) {
            console.error(`Error: ${error.message}`)

            // Provide specific guidance for permission errors
            if (error.message.includes("permission denied")) {
                console.error("\nThis is likely a permissions issue with your database.")
                console.error("For managed services like Neon or Supabase:")

                if (error.message.includes("schema public")) {
                    console.error("\n1. Try creating a custom schema manually through their SQL editor:")
                    console.error("   CREATE SCHEMA app_schema;")
                    console.error("   GRANT ALL ON SCHEMA app_schema TO current_user;")
                    console.error("\n2. Then run this initialization script again")
                } else if (error.message.includes("extension")) {
                    console.error("\n1. Try enabling the extension through their dashboard/UI")
                    console.error("2. Or modify the code to not require extensions")
                } else {
                    console.error("\n1. Check if you need to enable extensions in their dashboard")
                    console.error("2. Verify your connection string includes the correct user with sufficient privileges")
                }
            }

            if (error.stack) {
                console.error(`\nStack trace:\n${error.stack}`)
            }
        } else {
            console.error(`Unknown error: ${error}`)
        }

        return process.exit(1)
    }
}

// Run the initialization function
runDatabaseInitialization()
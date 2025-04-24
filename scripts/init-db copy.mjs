import { initializeDatabase } from "../lib/db-init.js"
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
            console.log("Detected managed PostgreSQL service. Note that some services have restricted permissions.")
        }

        // Track start time for performance logging
        const startTime = Date.now()

        // Initialize the database
        await initializeDatabase()

        // Calculate and log execution time
        const executionTime = ((Date.now() - startTime) / 1000).toFixed(2)
        console.log(`✅ Database initialized successfully in ${executionTime}s`)

        return process.exit(0)
    } catch (error) {
        console.error("❌ Database initialization failed:")

        if (error instanceof Error) {
            console.error(`Error: ${error.message}`)

            // Provide specific guidance for permission errors
            if (error.message.includes("permission denied")) {
                console.error("\nThis is likely a permissions issue with your database.")
                console.error("If you're using Neon, Supabase, or another managed service:")
                console.error("1. Check if you need to enable extensions in their dashboard")
                console.error("2. Verify your connection string includes the correct user with sufficient privileges")
                console.error("3. Some services require you to use their UI to create extensions like pgcrypto")
            }

            if (error.stack) {
                console.error(`Stack trace:\n${error.stack}`)
            }
        } else {
            console.error(`Unknown error: ${error}`)
        }

        return process.exit(1)
    }
}

// Run the initialization function
runDatabaseInitialization()
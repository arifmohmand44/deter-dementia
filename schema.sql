-- Create extension for UUID support (for CUID-like functionality)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- users Table
CREATE TABLE "users" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT,
  "password" TEXT,
  "emailVerified" TIMESTAMP,
  "image" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- accounts Table
CREATE TABLE "accounts" (
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
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- sessions Table
CREATE TABLE "sessions" (
  "sessionToken" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- verification_tokens Table
CREATE TABLE "verification_tokens" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  
  PRIMARY KEY ("identifier", "token")
);

-- authenticators Table (for WebAuthn)
CREATE TABLE "authenticators" (
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
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");
CREATE INDEX "authenticators_userId_idx" ON "authenticators"("userId");

-- Create trigger for updating the "updatedAt" timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW."updatedAt" = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updatedAt
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at
BEFORE UPDATE ON "accounts"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
BEFORE UPDATE ON "sessions"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
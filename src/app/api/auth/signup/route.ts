import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, password, captchaToken } =
      await request.json();

    // 1. First verify CAPTCHA
    if (!captchaToken) {
      return NextResponse.json(
        { error: "CAPTCHA verification required" },
        { status: 400 }
      );
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

    const captchaResponse = await fetch(verificationUrl, {
      method: "POST",
    });

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      console.error("CAPTCHA verification failed:", captchaData);
      return NextResponse.json(
        {
          error: "CAPTCHA verification failed",
          details: captchaData["error-codes"] || "Unknown error",
        },
        { status: 400 }
      );
    }

    // 2. Proceed with existing validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "First name, last name, email, and password are required" },
        { status: 400 }
      );
    }

    // 3. Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // 4. Generate full name and hash password
    const name = `${firstName} ${lastName}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await prisma.users.create({
      data: {
        firstName,
        lastName,
        name,
        email: email.toLowerCase(),
        phone,
        password: hashedPassword,
      },
    });

    // 6. Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

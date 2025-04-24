import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const summary = await prisma.dementia_questionnaire.findFirst({
            where: {
                userId: session?.user.id,
            },
        });

        // Return successful response with data
        return NextResponse.json({ data: summary }, { status: 200 });

    } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching summaries:", error);
        return NextResponse.json(
            { error: "Failed to fetch summaries" },
            { status: 500 }
        );
    }
}
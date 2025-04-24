import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const questions = await request.json();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }
    const finalAnswers = transformAnswersBeforeSubmit(questions);

    const apiResponse = await fetch("http://89.116.170.129/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalAnswers),
    });
    const apiResData = await apiResponse.json();

    // Create Questionnaire within a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Try to find existing questionnaire for this user
      const existingQuestionnaire =
        await prisma.dementia_questionnaire.findFirst({
          where: {
            userId: session.user.id,
          },
        });

      // 2. Create or update based on whether it exists
      let questionnaire;
      if (existingQuestionnaire) {
        questionnaire = await prisma.dementia_questionnaire.update({
          where: {
            questionnaireId: existingQuestionnaire.questionnaireId, // Use the primary key
          },
          data: {
            questions: questions,
            results: apiResData,
            updatedAt: new Date(),
          },
        });
      } else {
        questionnaire = await prisma.dementia_questionnaire.create({
          data: {
            questions: questions,
            results: apiResData,
            userId: session.user.id,
          },
        });
      }

      // 3. Update user's firstLogin status
      await prisma.users.update({
        where: { id: session.user.id },
        data: { firstLogin: true },
      });

      return questionnaire;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Questionnaire error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

const calculateBMI = (height: number, weight: number): number => {
  if (height <= 0) return 0; // Avoid division by zero
  return Number((weight / (height * height)).toFixed(1));
};

const transformAnswersBeforeSubmit = (answers: any) => {
  // Transform air pollution values
  const airPollutionMap: Record<string, string> = {
    Rural: "Low",
    Suburban: "Medium",
    Urban: "High",
  };

  if (
    answers["Air_pollution"] &&
    typeof answers["Air_pollution"] === "string"
  ) {
    answers["Air_pollution"] =
      airPollutionMap[answers["Air_pollution"]] || answers["Air_pollution"];
  }

  // Calculate BMI if height and weight are available
  const height = Number(answers["Height_in_meter"]);
  const weight = Number(answers["Weight_in_kilogram"]);

  if (height && weight) {
    answers["Obesity"] = Math.floor(calculateBMI(height, weight));
  }

  // Remove unnecessary fields
  const keysToRemove = [
    "Amount_of_alcohol",
    "Amount_of_smoking",
    "Associated_dementia",
    "Develop_dementia",
    "Current_Height",
    "Height_in_meter",
    "Height_in_feet",
    "Current_Weight",
    "Weight_in_kilogram",
    "Weight_in_pound",
    "Diet",
    "Ever_Had",
    "Genetic_Markers",
    "Health_Conditions",
    "Known_History",
    "Lifestyle",
    "Medical_Conditions",
    "Types_of_medications",
    "You_Have",
  ];

  return Object.fromEntries(
    Object.entries(answers).filter(([key]) => !keysToRemove.includes(key))
  );
};

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

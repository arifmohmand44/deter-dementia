"use client"
import { DIcon } from "@/components/dynamicIcons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileData {
    label: string;
    value: string;
}

interface ProfileCardProps {
    profileData?: ProfileData[];
}

const defaultProfileData = [
    { label: "Full Name", value: "Johnson Watson" },
    { label: "Age", value: "60" },
    { label: "Gender", value: "Male" },
    { label: "Dementia Risk Level", value: "Moderate" },
    { label: "Dementia Risk Score", value: "18/100" },
    { label: "Age-Based Risk Comparison", value: "Your risk is within the average range for your age group (60-65)" },
    { label: "Physical Activity Level", value: "Moderate (walks 3-4 times a week)" },
];

export default function ProfileCard({ profileData = defaultProfileData }: ProfileCardProps) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-semibold">Your Profile</CardTitle>
                <button className="text-gray-700 hover:text-gray-900">
                    <DIcon icon="Tb:Dots" size={24} />
                </button>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {profileData.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:justify-between"
                        >
                            <span className="text-gray-600 font-medium">{item.label}</span>
                            <span className="text-gray-900 sm:text-right mt-1 sm:mt-0">{item.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
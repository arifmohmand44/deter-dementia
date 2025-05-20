"use client";
import { useRouter } from "next/navigation";
import Logo from "@/components/logos/logo";
import Icon from "@/components/icon";

export default function QuestionnaireLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back(); // Go back if there's history
        } else {
            router.push('/'); // Redirect to homepage if no history
        }
    };

    const handleDismiss = () => {
        router.push('/'); // Redirect to homepage if no history
    };

    return (
        <>
            <div className="overflow-hidden">
                <div className="bg-gray-50 flex items-center justify-between p-6">
                    <div className="flex justify-start">
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={handleBack}
                        >
                            <Icon name="BackArrow" />
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <div className="flex justify-end">
                    <button
                            type="button"
                            className="cursor-pointer"
                            onClick={handleDismiss}
                        >
                            <Icon name="Dismiss" />
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </>
    );
}

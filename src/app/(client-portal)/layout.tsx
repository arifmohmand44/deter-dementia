import { Header } from "@/components/ui/header";
import SideBar from "@/components/ui/side-bar";
import Providers from "@/components/providers/session-provider";

export default function ClientPortalLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <div className="flex min-h-screen gap-6">
                <SideBar />
                {/* Main Content with Header */}
                <div className="flex-1 flex flex-col h-screen">
                    <Header />
                    <div className="flex-1 overflow-y-auto pe-4">
                        {children}
                    </div>
                </div>
            </div>
        </Providers>
    );
}


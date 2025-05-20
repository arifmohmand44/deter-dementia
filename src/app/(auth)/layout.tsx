import Image from "next/image";
import LogoLight from "@/components/logos/logo-light";
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="min-h-screen max-h-screen h-[100dvh] overflow-hidden bg-indigo-700 box-border relative">
                <div className="mx-auto xs:px-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="grid grid-cols-1 lg:h-screen">
                        <div className="flex justify-center pt-10">
                            <LogoLight />
                        </div>
                        <div className="hidden lg:flex justify-center items-end">
                            <Image
                                src="/img/bg.svg"
                                alt=""
                                className="w-[35rem] sm:w-[30rem] md:-ml-4 lg:-ml-0"
                                width={494.55}
                                height={494.55}
                                priority
                            />
                        </div>
                    </div>
                    <div className="lg:pt-4 sm:py-10 xs:py-5 bg-white rounded-tl-2xl rounded-bl-2xl sm:rounded-2xl xs:rounded-2xl flex items-center justify-center min-h-[400px]">
                        <div className="w-full xs:px-5">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

import Image from "next/image";
export default function LogoLight() {
    return (
        <Image
            src="/w-logo.svg"
            alt="Deter Dementia Logo"
            width={250.62}
            height={74.55}
            priority
        />
    )
}

import Image from "next/image";
export default function Logo() {
    return (
        <Image
            src="/logo.svg"
            alt="Deter Dementia Logo"
            className="h-155.95 w-46.39"
            width={155.95}
            height={46.39}
            priority
        />
    )
}

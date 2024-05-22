import Image from "next/image";
import Link from "next/link";


export const PureLogo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition 
             gap-x-2 flex items-center w-full">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    height={32}
                    width={32}
                />
            </div>
        </Link>

    )

}
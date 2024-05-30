import Image from "next/image";

export const PureLogo = () => {
    return (

        <div className="gap-x-2 flex items-center w-full">
            <Image
                src="/logo.svg"
                alt="Logo"
                height={32}
                width={32}
            />
        </div>
    )

}
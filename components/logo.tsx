import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

const textFont = Inter({
    subsets: ['cyrillic', 'latin'],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition
            items-center gap-x-2 hidden md:flex drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            ">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    height={30}
                    width={30}
                />
                <p className={cn("text-lg text-violet-900 pb-1", textFont.className, )}>
                    Таск Мастер
                </p>
                
            </div>
        </Link>

    )

}
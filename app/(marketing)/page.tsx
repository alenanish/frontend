import { Inter } from "next/font/google";
import { Key } from "lucide-react";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "@/app/style.css";

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

const MarketingPage = () => {
    return (
        <div>
            <div className="flex items-center justify-center flex-col">
                <div className="flex items-center justify-center flex-col">
                    <div className="mb-4 flex items-center border shadow-sm p-4
                    bg-amber-100 text-amber-700 rounded-full uppercase">
                        <Key className="h-6 w-6 mr-2" />
                        Твой ключ к продуктивности
                    </div>
                </div>
                <div className="text-3xl md:text-6xl text-center text-neutral-800 p-2">
                    Возьми под
                </div>
                    <mark className="text-3xl md:text-6xl  text-white px-4 p-2 rounded-md
    pb-4 w-fit text-center">
                        контроль
                    </mark> 
                <div className="text-3xl md:text-6xl text-center text-neutral-800 mb-3">
                    свои задачи
                </div>
                <div className={cn(
                    "text-sm md:text-xl text-neutral-600 mt-4 max-w-xs md:max-w-2xl text-center mx-auto", textFont.className )}>
                        Создавай, организовывай, делегируй и отслеживай с легкостью
                </div>
                <Button className="text-2xl mt-6" size="xlg" asChild>
                    <Link href="/sign-up">
                    Начать сейчас
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default MarketingPage;
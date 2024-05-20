import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import "@/app/style.css";

export const Navbar = () => {
    return (
        <div className="fixed top-o w-full h-14 px-4 border-b
        shadow-sm bg-white flex etm-center">
            <div className="md:max-w-screen-2xl mx-auto flex
            items-center w-full justify-between">
                <div className="hidden md:flex">
                    <Logo  />
                </div>
               
                <div className="space-x-4 md:block md:w-auto flex
                items-center justify-between w-full" >
                    <Button  className="text-lg" size="default" variant="outline" asChild>
                        <Link href="/sign-in">
                            Вход
                        </Link>
                    </Button>
                    <Button className="text-lg" size="default" asChild>
                        <Link href="/sign-up">
                            Регистрация
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};
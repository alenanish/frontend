"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import "@/app/style.css";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BoardNavbarProps {
    id : number;
}

export const BoardNavbar = ( {id} : BoardNavbarProps ) => {
    const router = useRouter();
    const pathname = usePathname();

    const Buttons = [
        {title: "Доска",  path: `/project/${id}/board`},
        {title: "Команда", path: `/project/${id}/team`},           
    ]
   


    return (
        

            <nav className="flex flex-row gap-2  pb-2">

            {
                        Buttons.map((button, index) => (
                            <Button size="sm" variant={pathname === button.path ? "current" : "ghost" } asChild key={index} onClick={() => router.push(button.path)}
                            className={`w-fit flex flex-row justify-start m-0 py-4 px-2 gap-2 rounded-md
                             border-b-2  ${pathname === button.path ? "" : "border-white" }`}>
                                <Link href={ button.path  }>
                                        { button.title }
                                </Link>
                                
                            </Button>
                        ))
                      }
            </nav>
    );
};

"use client";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { PureLogo } from "@/components/purelogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import "@/app/style.css";
import { ChevronLeft, ChevronRight, LayoutDashboard, LayoutList, Calendar, Settings, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";



export const Sidebar = ( ) => {
    const router = useRouter();
    const pathname = usePathname();

    const [expanded, setExpanded] = useState(true);
    const Buttons = [
        {title: "Проекты", src: <LayoutDashboard />, path: "/dashboard"},
        {title: "Задачи", src: <LayoutList />, path: "/tasks"},
        {title: "Календарь", src: <Calendar />, path: "/calendar"},
        {title: "Настройки", src: <Settings />, path: "/settings"},
        {title: "Выход", src: <LogOut />, path: "/"},
            
    ]
   


    return (
        <aside className="flex">
            <div className={` ${expanded ? "w-72" : "w-20"}
            flex flex-col transition-all duration-300 items-start bg-white w-fit h-screen m-0 p-3 gap-9 relative
             border-r border-primary rounded-r-lg drop-shadow-[4px_0px_8px_rgba(0,0,0,0.25)]`}>
                <Button className="transition-all absolute -right-5 top-3 " variant="outline" size="icon" type="button" onClick={() => setExpanded(!expanded)}> 
                    {
                        expanded ? (
                            <ChevronLeft className="transition-all group-hover:stroke-accent stroke-[#8E59C4] m-0 p-0"/>
                    
                        ) : (
                            <ChevronRight className="group-hover:stroke-accent transition-all stroke-[#8E59C4] m-0 p-0"/>
                        )
                    }
                </Button>
                <div className=" pt-1">
                    { expanded ? (<Logo />) : (<PureLogo />) }
                </div>
                    <div className="flex h-full flex-col items-start p-0 gap-3 relative
                    ">
                      {
                        Buttons.map((button, index) => (
                            <Button variant={pathname === button.path ? "active" : "ghost" } asChild key={index} onClick={() => router.push(button.path)}
                            className={` border-l-2 border-white w-full flex flex-row justify-start m-0 py-4 px-2 gap-2 rounded-lg
                            last:absolute last:bottom-0`}>
                                <Link href={ button.path }>
                                    { button.src  }
                                    <span className={`${!expanded && "hidden"} origin-left text-lg`}>
                                        { button.title }
                                    </span>
                                </Link>
                                
                            </Button>
                        ))
                      }
                    </div>
                
                </div>
        </aside>
    );
};

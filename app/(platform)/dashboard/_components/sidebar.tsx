"use client"; 
import { useState } from "react";
import { Logo } from "@/components/logo";
import { PureLogo } from "@/components/purelogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import "@/app/style.css";
import { ChevronLeft, ChevronRight, LayoutDashboard, LayoutList, Calendar, Settings, LogOut } from "lucide-react";


export const Sidebar = () => {
    const [open, setOpen] = useState(false);
        const Buttons = [
            {title: "Проекты", src: <LayoutDashboard size={32}/>, path: "/dashboard"},
            {title: "Задачи", src: <LayoutList size={32} />, path: "/tasks"},
            {title: "Календарь", src: <Calendar size={32} />, path: "/calendar"},
            {title: "Настройки", src: <Settings size={32} />, path: "/settings"},
            {title: "Выход", src: <LogOut size={32} />, path: "/"},
            
        ]
    return (
        <aside className="flex">
            <div className={` ${open ? "w-72" : "w-20"}
            flex flex-col transition-all duration-300 items-start bg-white w-fit h-screen m-0 p-3 gap-9 relative
             border-r border-primary rounded-r-lg drop-shadow-[4px_0px_8px_rgba(0, 0, 0, 0.25)]`}>
                <Button className="transition-all absolute -right-3 top-3 " variant="outline" size="icon" onClick={() => setOpen(!open)}> 
                    {
                        open ? (
                            <ChevronLeft className="transition-all group-hover:stroke-accent  stroke-[#8E59C4] m-0 p-0"/>
                    
                        ) : (
                            <ChevronRight className="group-hover:stroke-accent transition-all stroke-[#8E59C4] m-0 p-0"/>
                        )
                    }
                </Button>
                <div className=" pt-1">
                    { open ? (<Logo />) : (<PureLogo />) }
                </div>
                    <div className="flex h-full flex-col items-start p-0 gap-5
                    ">
                      {
                        Buttons.map((button, index) => (
                            <Button variant="outline" asChild key={index}
                            className="last: flex flex-row items-center m-0 py-4 px-2 gap-2 rounded-lg">
                                <Link href={ button.path }>
                                    { button.src  }
                                    <span className={`${!open && "hidden"} origin-left text-lg`}>
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
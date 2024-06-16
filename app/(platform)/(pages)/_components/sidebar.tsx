"use client";

import { Logo } from "@/components/logo";
import { PureLogo } from "@/components/purelogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import "@/app/style.css";
import { LayoutDashboard, LayoutList, Calendar, Settings, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";



export const Sidebar = ( {expanded} : {expanded: boolean} ) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogOut = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('refresh');
        router.push('/sign-in')
    }
    
    const Buttons = [
        {title: "Проекты", src: <LayoutDashboard />, path: "/dashboard"},
        {title: "Задачи", src: <LayoutList />, path: "/tasks"},
        {title: "Календарь", src: <Calendar />, path: "/calendar"},
        {title: "Настройки", src: <Settings />, path: "/settings"},
    
            
    ]
   


    return (
        <aside className="flex">
            <div className={` ${expanded ? "w-10 " : "w-10"}
            flex flex-col transition-all duration-300 items-start bg-white w-fit h-screen m-0 p-3 gap-9 relative
             border-r border-primary rounded-r-lg drop-shadow-[4px_0px_8px_rgba(0,0,0,0.25)]`}>
                <div className=" pt-1">
                    { expanded ? (<Logo />) : (<PureLogo />) }
                </div>
                    <div className="flex h-full flex-col items-start p-0 gap-3 relative
                    ">
                      {
                        Buttons.map((button, index) => (
                            <Button variant={pathname === button.path ? "active" : "ghost" } asChild key={index} onClick={() => router.push(button.path)}
                            className={`w-full flex flex-row justify-start m-0 py-4 px-2 gap-2 rounded-lg
                            last:absolute last:bottom-0 border-l-2  ${pathname === button.path ? "" : "border-white" }`}>
                                <Link href={ button.path }>
                                    { button.src  }
                                    <span className={`${!expanded && "hidden"} origin-left text-lg`}>
                                        { button.title }
                                    </span>
                                </Link>
                                
                            </Button>
                        ))
                        
                      }
                      <Button variant="ghost"  className="w-full flex flex-row justify-start m-0 py-4 px-2 gap-2 rounded-lg
                            last:absolute last:bottom-0 border-l-2 border-white" onClick={handleLogOut}> 
                                <LogOut />
                                <span className={`${!expanded && "hidden"} origin-left text-lg`}>Выход</span>
                            </Button>
                    </div>
                
                </div>
        </aside>
    );
};


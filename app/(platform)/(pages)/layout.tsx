"use client";
import { Sidebar } from "./_components/sidebar"
import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AuthChecker from "@/app/AuthChecker";


const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
})  => { 
    const [expanded, setExpanded] = useState(true);

    return (
        
        <AuthChecker url={'/sign-in'}>
        
        <div className="w-full min-h-full transition-all flex flex-row bg-primary/20 gap-2 relative">
            
            <div className="fixed">
                <Sidebar expanded={expanded} />  
                <Button className="transition-all absolute -right-5 top-3 " variant="outline" size="icon" type="button" onClick={() => setExpanded(!expanded)}> 
                    {
                        expanded ? (
                            <ChevronLeft className="transition-all group-hover:stroke-accent stroke-[#8E59C4] m-0 p-0"/>
                    
                        ) : (
                            <ChevronRight className="group-hover:stroke-accent transition-all stroke-[#8E59C4] m-0 p-0"/>
                        )
                    }
                </Button>

            </div>
                
            <div className={`${expanded? "ml-44" :"ml-20" } w-full`}>
                <main>
                    {children}
                </main>
                    
            </div>
            
        </div>
        </AuthChecker>
    );
};

export default DashboardLayout;


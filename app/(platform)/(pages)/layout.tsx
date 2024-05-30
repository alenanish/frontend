"use client";
import { Sidebar } from "./_components/sidebar"
import { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";


const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
})  => { 
    const [expanded, setExpanded] = useState(true);

    return (
        
        <div className="w-full min-h-full transition-all flex flex-row bg-violet-100 gap-2 relative">
            
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
                
            <div className={`${expanded? "ml-44" :"ml-20" }`}>
                <main>
                    {children}
                </main>
                    
            </div>
            
        </div>
    );
};

export default DashboardLayout;


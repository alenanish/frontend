import { ChevronLeft } from "lucide-react";
import { BoardNavbar } from "../../_components/board-navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const ProjectLayout = ({
    children,
    params,
   
}: {
    children: React.ReactNode;
    params: {projectId : number};
})  => { 


    return (

        <div className="w-full min-h-full transition-all flex flex-col bg-primary/20 gap-2 relative ">
            <header className=" sticky top-o w-full h-fit px-4 border-b p-1
        shadow-sm bg-white">
                <div className="flex flex-row gap-2">
                    <Button variant="ghost" size="icon" > 
                    <ChevronLeft size={32} />

                    </Button>
                    <h1 className="block text-3xl font-medium text-neutral-800">
                        Проект {params.projectId}
                    </h1>
                    
                </div>
                <BoardNavbar id={params.projectId} />

            </header>
       
        
                <main className="flex w-full">
                    { children }
                </main>            
        </div>

    );
};

export default ProjectLayout;


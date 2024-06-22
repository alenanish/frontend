"use client";
import AuthChecker from "@/app/AuthChecker";
import { BoardHeader } from "../../_components/board-header";


const ProjectLayout = ({
    children,
    params,
   
}: {
    children: React.ReactNode;
    params: {boardId : number};
})  => { 
    
    return (
        <AuthChecker url={'/sign-in'}>
        <div className="w-full min-h-full transition-all flex flex-col bg-primary/20 gap-2 relative ">
           <BoardHeader id={params.boardId} />
                <main className="flex w-full">
                    {children}
                </main>            
        </div>
        </AuthChecker>

    );
};

export default ProjectLayout;


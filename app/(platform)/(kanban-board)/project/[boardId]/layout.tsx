import { BoardHeader } from "../../_components/board-header";


const ProjectLayout = ({
    children,
    params,
   
}: {
    children: React.ReactNode;
    params: {boardId : number};
})  => { 
    
    return (
        <div className="w-full min-h-full transition-all flex flex-col bg-primary/20 gap-2 relative ">
           <BoardHeader id={params.boardId} />
                <main className="flex w-full">
                    {children}
                </main>            
        </div>

    );
};

export default ProjectLayout;


"use client";

import { Button } from "@/components/ui/button";

import "@/app/style.css";

import { ChevronLeft, Plus } from "lucide-react";


import { Droppable,  } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import TaskAction from "./task-actions";
import TaskCard from "./task-card";

interface ColumnProps {
    status: string;
    boardId: number;
    Tasks: any;
    key: number;
    id: number;
    name: string;
}



export const Column = ( {status, key, boardId, Tasks, name, id} : ColumnProps ) => { 
    const [orderedData, setOrderedData] = useState(Tasks);

    useEffect(() =>{
        setOrderedData(Tasks);
    }, [Tasks]);


    return (
            

        <div className="flex w-1/3 flex-col">
            <div className="flex w-full font-medium text-lg items-center justify-between px-4 py-3 border-b border-[#212121] mb-3">
                { name }
                <TaskAction boardId={boardId}  task_id={null} task_title={''} task_priority={''} task_description={''} task_created_at={''} task_deadline={''} task_on_board={boardId} task_assignee={null} task_status={status}
                    trigger={
                        <Button size="icon" variant="secondary"> <Plus /> </Button>
                    }  
                />
            </div>
            <Droppable droppableId={status} >
                {(droppableProvided, snapshot) => (
                        <div 
                        className= {snapshot.isDraggingOver ? ' opacity-5' : '' 
                           + 'm-2 flex flex-col gap-4'}
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef} >
                        {
                            Tasks.map((task : any, index : number) => (
                            
                                <TaskCard key={index} id={task.id} index={index} title={task.title} description={task.description} deadline={task.deadline}
                                on_board={boardId} priority={task.priority} created_at={task.created_at} assignee={task.assignee} status={"to-do"} />  
                            )) 
                        }
                        {droppableProvided.placeholder}
                        </div>
                       
                    )} 
                </Droppable>
        </div>  
        
    );
};

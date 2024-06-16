"use client";

import { Button } from "@/components/ui/button";

import "@/app/style.css";

import { ChevronLeft, Plus } from "lucide-react";
import TaskAction from "./task-actions";
import TaskCard from "./task-card";

import { DragDropContext, Droppable,  } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

interface ColumnProps {
    id : number;
    index: number;
    name: string;
    value: string;
    boardId: number;
    Tasks: any;

}


function reorder<T>(list: T[], startIndex:number, endIndex: number){
    const result=Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export const Column = ( {id, index, name, value, boardId, Tasks} : ColumnProps ) => { 
    const [orderedData, setOrderedData] = useState(Tasks);

    useEffect(() =>{
        setOrderedData(Tasks);
    }, [Tasks]);

    const onDragEnd = (result: any) => {
        
        const {destination, source, type} = result;
        if (!destination) {
            return;
            
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            
            return;
        }
        if (type === 'card') {
           
            let newOrderedData = [...orderedData];

            const sourceList = newOrderedData.find(list => list.id === source.droppableId);
            const destList = newOrderedData.find(list => list.id === destination.droppableId);

            if (!source || !destList) {
                return;
            }

            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            if (!destList.cards) {
                destList.cards = [];
            }

            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    source.cards,
                    source.index,
                 destination.index,
            );

            reorderedCards.forEach((card:any, idx:number) => {
                card.order = idx;
            });

            sourceList.cards = reorderedCards;
            setOrderedData(newOrderedData);

            } else {
                const [movedCard] = sourceList.cards.splice(source.index, 1);

                movedCard.listId = destination.droppableId;

                destination.cards.splice(destination.index, 0, movedCard);

                sourceList.card.forEach((card: any, idx: number) => {
                    card.order = idx;
                });

                destList.cards.forEach((card: any, idx: number) => {
                    card.order = idx;
                });

                setOrderedData(newOrderedData);


            }


        }

    }

    return (
            

            <div className="flex w-1/3 flex-col">
            <div className="flex w-full font-medium text-lg items-center justify-between px-4 py-3 border-b border-[#212121] mb-3">
            { name }
            <TaskAction  task_id={null} task_title={''} task_priority={''} task_description={''} task_created_at={''} task_deadline={null} task_on_board={boardId} task_assignee={null} task_status={'to-do'}
                trigger={
                    <Button size="icon" variant="secondary"> <Plus /> </Button>
                }  
        />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="lists" >
                    {(provided) => (
                        <div 
                        className="m-2 flex flex-col gap-4"
                        {...provided.droppableProps}
                        ref={provided.innerRef} >
                        {
                            Tasks.map((task : any, index : number) => (
                            
                                <TaskCard key={index} id={task.id} index={index} title={task.title} description={task.description} deadline={task.deadline}
                                on_board={boardId} priority={task.priority} created_at={task.created_at} assignee={task.asignee} status={"to-do"} />  
                            )) 
                        }
                        {provided.placeholder}
                        </div>
                       
                    )} 
                </Droppable>
            </DragDropContext>  
        </div>  
        
    );
};

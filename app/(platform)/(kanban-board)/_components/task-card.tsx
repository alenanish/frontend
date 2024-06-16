"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, X, Calendar, PenLine } from "lucide-react"

import { Draggable, Droppable } from "@hello-pangea/dnd";

import TaskAction from "./task-actions";

 
const TaskCard = ({ id, index,  title,  description,  created_at,  deadline,  priority,  on_board,  assignee,  status } 
  : { id: number; index:number;  title: string;  description: string;  created_at: string;  deadline: string ;  priority: string;  on_board: number;  assignee: string | null;  status: string; }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteCard = () => {
    // Handle deleting the card here
    console.log("Deleting card with ID",  id);
  };

  return (
    <Draggable  draggableId={ id.toString()} index={index}>
      {(provided) => (
      <article className="bg-white  border-2 border-primary flex flex-col items-stretch p-3 gap-2
                          shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md w-full h-[200px] " 
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          >

          <div className="flex flex-row justify-between">
            <div className={`${ priority == 'Высокий' ? " bg-accent/10  border-accent/40 text-accent" :"" } 
                    
                    ${ priority === 'Средний' ? " bg-[#F8D7B5]  border-[#CD8F3C] text-[#A16500]"  : ""}
                    ${ priority === 'Низкий' ? "bg-green-100  border-green-400 text-green-600" : "" }
                    
                    flex flex-row border text-sm h-fit items-center gap-1 rounded-md p-1`}>
                        {  priority }
                    </div>

          <div className={`border border-black ${isOpen? " border-primary " : " border-white"} border self-end flex flex-row-reverse gap-1 bg-white rounded-lg m-0 p-0`} >

              <Button size="icon" type="button" variant={isOpen? "outline" : "ghost"}  onClick={handleOpenDropdown}>
                  { 
                      isOpen? 
                      <X size={20} className="w-5 h-5" /> :
                      <EllipsisVertical size={20} />
                  }
                  
              </Button>
              {isOpen && (
                  <div className="flex gap-1 ">
                      <Button size="icon" type="button" variant="secondary" className="hover:bg-destructive/10 " onClick={handleDeleteCard}>
                          <Trash2 size={20} className=" group-hover:stroke-destructive" />
                      </Button>
                      <TaskAction  task_id={ id } task_title={title} task_priority={priority}  task_description={description} 
                            task_created_at={created_at} task_deadline={deadline} task_on_board={on_board} task_assignee={assignee} task_status={status}
                            trigger={
                                <Button size="icon" type="button" variant="secondary"  className="hover:bg-[#D5DDEE] ">
                                < PenLine size={20} className=" group-hover:stroke-[#6D88B0]"/>
                                </Button>
                            }     
                        />

                  </div>
              )}
          
            </div>
          </div>

                <div
                className="flex flex-col h-full"
                {...provided.dragHandleProps}
                >
                <Droppable droppableId={id.toString()} type="card">
                {(provided) => (
                    <div className="flex flex-col h-full"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div className="flex flex-col h-full items-center align-middle justify-center" >
                            <h1 className="text-center line-clamp-2 text-balance font-medium"> 
                                {title} 
                            </h1>

                            <div className="flex h-full items-center align-middle justify-center text-neutral-700" >
                                {description}
                            </div>
                            
                        </div>
                        
                        
                        <div className="flex flex-row items-center justify-between w-full">
                            <div className="flex flex-row items-center gap-1 w-full rounded-md text-neutral-800 text-sm stroke-neutral-700">
                                <Calendar size={ 16 } />
                                { deadline.split("-").reverse().join(".") }
                            
                            </div>
                        </div>
                        {provided.placeholder}
                </div>
                )}
                </Droppable>

              </div>          
      </article>
      )}
      </Draggable>
  );
};

export default TaskCard;
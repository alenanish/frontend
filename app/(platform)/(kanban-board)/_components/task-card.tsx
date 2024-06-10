"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, X, Calendar } from "lucide-react"

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import EditTask from "./edit-task";



const TaskCard = ({ id, title, priority, deadline, description, board} : {id: number; title: string; priority: string; deadline: string; description: string; board: number}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteCard = () => {
    // Handle deleting the card here
    console.log("Deleting card with ID", id);
  };

  const handleCardClick = () => {
    // Переход на канбан доску проекта с использованием ID карточки
    router.push(`/project/${id}/board`);    
  };


  return (
    <article className="bg-white  border-2 border-primary flex flex-col items-stretch p-3 gap-2
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md w-full h-[200px]" >

        <div className="flex flex-row justify-between">
          <div className={`${priority == 'Высокий' ? " bg-accent/10  border-accent/40 text-accent" :"" } 
                  
                  ${priority === 'Средний' ? " bg-[#F8D7B5]  border-[#CD8F3C] text-[#A16500]"  : ""}
                  ${priority === 'Низкий' ? "bg-green-100  border-green-400 text-green-600" : "" }
                  
                  flex flex-row border text-sm h-fit items-center gap-1 rounded-md p-1`}>
                      { priority }
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
                    <EditTask id={id} title={title} priority={priority} deadline={deadline} description={description}  />
                </div>
            )}
        
          </div>
        </div>
       
                <div className="flex h-full items-center align-middle justify-center" >
                    <h1 className="text-center line-clamp-2 text-balance"> 
                        {title} 
                    </h1>
                   
                </div>
                <div className="flex h-full items-center align-middle justify-center" >
                    {description}
                </div>
                
            <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center gap-1 w-full rounded-md text-neutral-800 text-sm stroke-neutral-700">
                        <Calendar size={ 16 } />
                        { deadline.split("-").reverse().join(".") }
                    
                    </div>
                    

            </div>
        
    </article>
  );
};

export default TaskCard;
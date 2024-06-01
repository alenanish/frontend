"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, X, PenLine, Calendar } from "lucide-react"
import { EditProject } from "./edit-project";


const Card = ({ id, title, progress, priority, deadline, description } : {id: number; title: string; progress: number; priority: string; deadline: string; description: string;}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteCard = () => {
    // Handle deleting the card here
    console.log("Deleting card with ID", id);
  };


  return (
    <article className="bg-white  border-2 border-primary flex flex-col items-stretch p-3 gap-2
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md w-[200px] h-[200px]">
        

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
                    <EditProject id={id} title={title} priority={priority} deadline={deadline} description={description}  />
                </div>
            )}
        
        </div>
        <div className="flex h-full items-center align-middle justify-center">
            <h1 className="text-center line-clamp-2 text-balance"> 
                {title} 
            </h1>
        </div>
        <div className="w-full ">
            <div className="flex justify-between w-full">
                <div className="w-full  ">
                    Прогресс
                </div>
                <div className="  "> { progress }% </div>
            </div>
            <div className='h-2 w-full bg-neutral-300 rounded-md'>
                <div
                    style={{ width: `${progress}%`}}
                    className={`rounded-md h-full ${
                        progress < 70 ? 'bg-accent' : 'bg-primary'}`}>
                </div>
            </div>
        </div>
       <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-1 w-full rounded-md text-neutral-800 text-sm stroke-neutral-700">
                <Calendar size={ 16 } />
                { deadline }
               
            </div>
            <div className={`${priority == 'высокий' ? " bg-accent/10  border-accent/40 text-accent" :"" } 
           
             ${priority === 'средний' ? " bg-[#F8D7B5]  border-[#CD8F3C] text-[#A16500]"  : ""}
             ${priority === 'низкий' ? "bg-green-100  border-green-400 text-green-600" : "" }
            
            flex flex-row border text-sm items-center gap-1 rounded-md p-0.5`}>
                { priority }
            </div>

       </div>
        
    </article>
  );
};

export default Card;
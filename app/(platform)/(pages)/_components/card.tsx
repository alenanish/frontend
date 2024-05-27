"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {Clock,  EllipsisVertical, Trash2, X, PenLine } from "lucide-react"


const Card = ({ id, title, progress, deadline } : {id: number; title: string; progress: number; deadline: string;}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteCard = () => {
    // Handle deleting the card here
    console.log("Deleting card with ID", id);
  };

  const handleEditCard = () => {
    // Handle editing the card here
    console.log("Editing card with ID", id);
  };

  return (
    <article className="bg-white  border-2 border-primary flex flex-col items-start p-3 gap-3
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md">
        

        <div className={` ${isOpen? " border-primary " : " border-white"} border self-end flex flex-row-reverse gap-1 bg-white rounded-lg m-0 p-0`} >

            <Button size="icon" type="button" variant={isOpen? "outline" : "ghost"}  onClick={handleOpenDropdown}>
                { 
                    isOpen? 
                    <X className="w-5 h-5" /> :
                    <EllipsisVertical />
                }
                
            </Button>
            {isOpen && (
                <div className="flex gap-1 ">
                    <Button size="icon" type="button" variant="secondary" className="hover:bg-destructive/10 " onClick={handleDeleteCard}>
                        <Trash2 className=" group-hover:stroke-destructive" />
                    </Button>
                    <Button size="icon" type="button" variant="secondary"  className="hover:bg-[#D5DDEE] " onClick={handleEditCard}>
                        < PenLine className=" group-hover:stroke-[#6D88B0]"/>
                    </Button>
                </div>
            )}
        
        </div>
        <h2 className=" self-center text-neutral-800 text-md font-medium "> {title} </h2>
        <div className="flex justify-between w-full">
            <div className=" ">
                Прогресс
            </div>
            <div className="  "> { progress }% </div>
        </div>
        <progress value={progress} max={100} className="rounded-md" />
        <div className="flex flex-row items-center gap-1 justify-end w-full rounded-md">
            <Clock size={ 16 } />
            { deadline }
        </div>
    </article>
  );
};

export default Card;
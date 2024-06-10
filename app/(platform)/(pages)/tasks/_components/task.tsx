"use client";
import React, { useState } from "react";


import Link from "next/link";
import { Button } from "@/components/ui/button";



const Task = ({ id, title, priority, deadline, description, board } : {id: number; title: string; priority: string; deadline: string; description: string;  board: any; }) => {
  
  return (
    <article className="flex w-full h-fit p-1" >

       <div className="w-1/5  font-medium">{title}</div>
       <div className="w-1/5 ">{deadline.split("-").reverse().join(".") }</div>
       <div className="w-1/5 ">
            <div className={`${priority == 'Высокий' ? " bg-accent/10  border-accent/40 text-accent" :"" } 
                
                ${priority === 'Средний' ? " bg-[#F8D7B5]  border-[#CD8F3C] text-[#A16500]"  : ""}
                ${priority === 'Низкий' ? "bg-green-100  border-green-400 text-green-600" : "" }
                
                 border text-sm items-center gap-1 rounded-md p-0.5 w-fit h-fit`}>
                    { priority }
                </div>
       </div>
       
       <div className="w-1/5  text-clip">{description}</div>
        <Button className="w-1/5 justify-start " asChild  variant="link">
                <Link href={`/project/${id}/board`}>На доске</Link>
        </Button>
    </article>
  );
};

export default Task;
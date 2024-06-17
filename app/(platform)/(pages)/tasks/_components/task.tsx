"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const Task = ({ id, title, priority, deadline, description, on_board } : {id: number; title: string; priority: string; deadline: string; description: string;  on_board: any; }) => {
  
  return (
    <article className="flex w-full h-fit p-1" >

       <div className="w-1/5  font-medium">{title}</div>
       <div className="w-1/5 ">{deadline.split("-").reverse().join(".") }</div>
       <div className="w-1/5 ">
            <div className={`${priority === 'high' ? " bg-accent/10  border-accent/40 text-accent" :"" } 
                
                ${priority === 'medium' ? " bg-[#F8D7B5]  border-[#CD8F3C] text-[#A16500]"  : ""}
                ${priority === 'low' ? "bg-green-100  border-green-400 text-green-600" : "" }
                
                 border text-sm items-center gap-1 rounded-md p-0.5 w-fit h-fit`}>
                    { priority === 'high' ? 'Высокий' : priority === 'medium'? 'Средний' : 'Низкий' }
                </div>
       </div>       
       <div className="w-1/5  text-clip">{description}</div>
        <Button className="w-1/5 justify-start " asChild  variant="link">
                <Link href={`/project/${on_board}/board`}>На доске</Link>
        </Button>
    </article>
  );
};

export default Task;
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, X } from "lucide-react"
import { BoardAction } from "./board-actions";

import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";



const BoardCard = ({ id, title, progress, description } : {id: number; title: string; progress: number; description: string;}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/boards/${id}/", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth'),
        }
      });
          } catch (error) {
      console.error('Ошибка при удалении проекта:', error);
    }
  };


  const handleCardClick = () => {
    // Переход на канбан доску проекта с использованием ID карточки
    //router.push(/project/${id}/board/);
    console.log(id, title, progress)
    const response =  axios.get(`http://127.0.0.1:8000/api/project/${id}/board/`, { // Используйте шаблонные строки для подстановки id
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth'),
          }
        })

        console.log(response)


  };

  return (
    <article className="bg-white  border-2 border-primary flex flex-col items-stretch p-3 gap-2
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md w-[200px] h-[200px]" >

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
                    <Button size="icon" type="button" variant="secondary" className="hover:bg-destructive/10 " onClick={handleDelete}>
                        <Trash2 size={20} className=" group-hover:stroke-destructive" />
                    </Button>
                    <BoardAction board_id={id} board_title={title} board_description={description}  board_progress={progress}/>
                </div>
            )}
        
        </div>
          

                <div className="flex h-full items-center align-middle justify-center" onClick={handleCardClick}>
                <Link key={id}
                 href={`/project/${id}/board`}>
                    <h1 className="text-center line-clamp-2 text-balance"> 
                        {title} 
                    </h1>
                </Link>
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
    </article>
  );
};

export default BoardCard;
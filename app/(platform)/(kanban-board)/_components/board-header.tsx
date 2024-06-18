"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import "@/app/style.css";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { BoardNavbar } from "./board-navbar";
import { useEffect, useState } from "react";
import axios from "axios";


interface Board {
    description: string;
    id: number;
    progress:number;
    title: string;
}

export const BoardHeader = ({id} : {id : number; } ) => {
    const router = useRouter();
    const pathname = usePathname();
    const [Board, setBoard] = useState<Board>();

    const fetchData = async () => {
        try {
        const response = await axios.get(`http://localhost:8000/api/boards/${id}/`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth'),
          }
        })
        setBoard(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };
    useEffect(() => {
        fetchData();
    }, [],
    );

    const Buttons = [
        {title: "Доска",  path: `/project/${id}/board`},
        {title: "Команда", path: `/project/${id}/team`},           
    ]
   
    return (
        <header className=" sticky top-o w-full h-fit px-4 border-b p-1
            shadow-sm bg-white">
            <div className="flex flex-row gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.back()}> 
                    <ChevronLeft size={32} />
                </Button>
                <h1 className="self-center block text-2xl font-medium text-neutral-800">
                    {Board?.title}
                </h1>
            </div>
            <BoardNavbar id={id} />
    </header>
    );
};



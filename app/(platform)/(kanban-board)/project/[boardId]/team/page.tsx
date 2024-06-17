"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Member from "./_components/member";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";


export default function TeamPage({ params }: { params: { boardId: number } }) {

  interface Team {
  id: {
    board: number;
    can_edit: boolean;
    id: number;
  }
    participant: {
      email: string;
      id: number;
      username: string;
    };
  }
  
  
  const [Team, setTeam] = useState([]);
  
      const fetchTeam = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/project/${params.boardId}/team/`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
          })
  
          setTeam(response.data);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };
  
      useEffect(() => {
          fetchTeam();
          
      }, [],
      );
      

  return (
    <div className=" flex flex-col gap-2 items-start m-2 p-4 h-full w-full " >
      <div className="w-fit h-fit absolute top-10 right-6">
        <Button type="button" variant="default" className="sm:px-2 md:gap-2">
          <UserRoundPlus />
          <span className="hidden md:block">
            Добавить участника
          </span>
        </Button>
        </div>

        
        <div className="bg-white flex flex-wrap gap-4 border-2 border-primary items-stretch p-3
                     shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md h-full w-full">
        <article className="flex w-full h-full p-1 border-b border-neutral-500 self-center " >

            <div className="w-1/4 flex justify-center self-center font-medium">Имя пользователя</div>
            <div className='w-1/4 flex justify-center self-center '>Эл.почта</div>
            <div className="w-1/4 flex justify-center self-center "> Разрешить <br/> редактирование </div>
            <div className="w-1/4 flex justify-center self-center "> Убрать из команды </div>
        </article>
            
        {
          Team.map((member: Team, index) => (
            <Member board_id={member.id.board} key={index} id={member.id.id} email={member.participant.email}  username={member.participant.username}  can_edit={member.id.can_edit} />
          ))
      
        }
        </div>
    </div>
);
};
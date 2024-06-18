"use client";

import axios from "axios";
import { Key, useEffect, useState } from "react";
import Member from "./_components/member";
import { useRouter } from "next/navigation";
import AddTeamMemberButton from "./_components/add-team-member";


export default function TeamPage({ params }: { params: { boardId: number } }) {
  const router = useRouter();
  interface Team {
      board: number;
      can_edit: boolean;
      id: number;
        participant: {
        email: string;
        id: number;
        username: string;
      }
  }
  
  const [Team, setTeam] = useState<Team[]>([]);
  
      const fetchTeam = async () => {
        try {
          console.log(`http://localhost:8000/api/project/${params.boardId}/team/`)
          const response = await axios.get(`http://localhost:8000/api/project/${params.boardId}/team/`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
          })
          setTeam(response.data);
          console.log(response.data)
          
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
      <div>

          <AddTeamMemberButton board_id={params.boardId} refreshPage={fetchTeam} />
        </div>

        
        <div className="bg-white flex flex-wrap gap-4 border-2 border-primary items-stretch p-3
                     shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md h-full w-full">
        <article className="grid grid-cols-5 w-full h-full p-1 border-b border-neutral-500 self-center " >
            <div className=" flex justify-center self-center font-medium">ID</div>
            <div className=" flex justify-center self-center font-medium">Имя пользователя</div>
            <div className=' flex justify-center self-center '>Эл.почта</div>
            <div className=" flex justify-center self-center "> Разрешить <br/> редактирование </div>
            <div className=" flex justify-center self-center "> Убрать из команды </div>
        </article>
            
        {
          Team? Team.map((member: Team, index: Key | null | undefined) => (
            <Member id={member.id} board_id={member.board} key={index} participant_id={member.participant.id} email={member.participant.email}  username={member.participant.username}  can_edit={member.can_edit} refreshPage={fetchTeam}/>
          )):
          <span>Нет действующих участников</span>
      
        }
        </div>
    </div>
);
};
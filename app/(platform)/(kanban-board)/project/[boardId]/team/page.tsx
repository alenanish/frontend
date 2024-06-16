"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Member from "./_components/member";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";


export default function TeamPage({ params }: { params: { boardId: number } }) {

  interface Team {
    id: number,
    first_name : string,
    last_name: string,
    email: string,
    username : string,
    can_edit: string,
  };
  
  const [Team, setTeam] = useState([]);
  
  
      const fetchTeam = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/project/${params.boardId}/team/`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
          })
  
          setTeam(response.data);
          console.log(`Team ${params.boardId} : `, Team)
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };
  
      useEffect(() => {
          fetchTeam();
          
      }, [],
      );
      

  return (
   
    <div className="w-full">
    <div className="w-fit h-fit absolute top-10 right-6">
    <Button type="button" variant="default" className="sm:px-2 md:gap-2">
                        <UserRoundPlus />
                        <span className="hidden md:block">
                            Добавить участника
                        </span>
                </Button>
    </div>
     <main>
        {
          Team.map((member: Team, index) => (
            <Member board_id={params.boardId} key={index} id={member.id} email={member.email}  username={member.username} first_name={member.first_name} last_name={member.last_name} can_edit={member.can_edit} />
          ))
      
        }

  </main>
    </div>
  );

};
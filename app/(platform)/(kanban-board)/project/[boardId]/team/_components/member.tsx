"use client";
import React, { useState } from "react";


import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Switch from "react-switch";
import axios from "axios";




const Member = ({ id, participant_id, username, email, can_edit, board_id, refreshPage } 
    : {id: number; participant_id: number; username: string; email: string; can_edit: boolean; board_id: number; refreshPage: any }) => {
  
    const [checked, setChecked] = useState(can_edit);

    const [member, setMember] = useState( {
      id: id,
      participant_id: participant_id,
      board_id: board_id,
      can_edit: can_edit,
      username: username,
      email: email,
    }
     );

     const handleDelete = async () => {
      try {
        await axios.delete(
         ` http://localhost:8000/api/project/${member.board_id}/team/${member.id}/`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth"),
            },
          }
        );
      } catch (error) {
        console.error("Ошибка при удалении члена команды:", error);
      }
      refreshPage();
    };
  
    const handleChange = async () => {
      setChecked(!checked);
      try {
        await axios.patch(
          `http://localhost:8000/api/project/${member.board_id}/team/${member.id}/`,
          { can_edit: !checked },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth"),
            },
          }
        );
      } catch (error) {
        console.error("Ошибка при обновлении прав доступа:", error);
      }
    };
  
    return (
      <article className="grid grid-cols-5 w-full h-fit p-1 ">
        <div className=" flex self-center justify-center font-medium">
          {participant_id}
        </div>
        <div className=" flex self-center justify-center font-medium">
          {username}
        </div>
        
        <div className=" flex self-center justify-center ">{email}</div>
        <div className=" flex self-center justify-center ">
          <Switch
            onColor="#A46DDA"
            borderRadius={6}
            onChange={handleChange}
            checked={checked}
          />
        </div>
        <div className=" flex self-center justify-center ">
          <Button
            variant="ghost"
            size="icon"
            className=" hover:stroke-destructive hover:border-destructive"
            onClick={handleDelete}
          >
            <Trash2 />
          </Button>
        </div>
      </article>
    );
  };
  
  export default Member;
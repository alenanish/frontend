"use client";
import React, { useState } from "react";


import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Switch from "react-switch";
import axios from "axios";


const Member = ({ id, username, email, can_edit, board_id } 
    : {id: number; username: string; email: string; can_edit: boolean; board_id: number; }) => {
  
    const [checked, setChecked] = useState(!can_edit);

    const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/project/${board_id}/team/${id}/`, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
          });
              } catch (error) {
          console.error('Ошибка при удалении проекта:', error);
        }
      };

    return (
        <article className="flex w-full h-fit p-1 " >
            <div className="w-1/4 flex self-center justify-center font-medium">{username}</div>
            <div className="w-1/4 flex self-center justify-center ">{ email }</div>
            <div className="w-1/4 flex self-center justify-center ">
                <Switch onColor="#A46DDA" borderRadius={6} onChange={setChecked} checked={checked} />
            </div>
            <div className="w-1/4 flex self-center justify-center ">
                <Button variant="ghost" size="icon" className=" hover:stroke-destructive hover:border-destructive"
                onClick={handleDelete}>
                    <Trash2 />    
                </Button> 
            </div>
        </article>
  );
};

export default Member;
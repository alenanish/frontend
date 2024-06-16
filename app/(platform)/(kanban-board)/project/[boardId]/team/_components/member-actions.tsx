"use client"

import  React, {useState} from "react";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, UserRoundPlus } from "lucide-react"
import axios from "axios"

export default function MemberAction ({member_id, member_board_id, member_can_edit} : 
    {member_id: number; member_board_id: number; member_can_edit: string;})  {

    const [post, setPost] = useState();
    const [permission, setPermission] = useState(member_can_edit);
    const [formData, setFormData] = useState({
        participant_id: member_id,
        can_edit: member_can_edit,
        board_id: member_board_id,

    });

    const handleChange = ( value: string) => {
        setFormData(prevState => ({
        ...prevState,
        'can_edit': value,
        }));

        patchData(value);
    };


  const patchData = (value: string) => {
   setPermission(value)
    
   if (permission === '-1') {
    axios
      .delete(`http://localhost:8000/api/project/${member_board_id}/team/${member_id}/`)
      .then((response) => {
        setPost(response.data);
      });
      
    return;

   }

    axios
      .patch(`http://localhost:8000/api/project/${member_board_id}/board/${member_id}/`, formData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('auth'),
        }
      })
      .then((response) => {
        setPost(response.data);
      });
      
   
    }
    
        



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
            <EllipsisVertical />
        </Button>


      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>участника</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup  value={permission} onValueChange={handleChange}>
          <DropdownMenuRadioItem value='1'>Вносить изменения</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='0'>Читать</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='-1'>Удалить участника</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


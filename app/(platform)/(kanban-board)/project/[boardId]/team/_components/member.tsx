"use client";
import React, { useState } from "react";


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import MemberAction from "./member-actions";



const Member = ({ id, username, email, first_name, last_name, can_edit, board_id } 
    : {id: number; username: string; first_name: string; last_name: string; email: string; can_edit: string; board_id: number; }) => {
  
  return (
    <article className="flex w-full h-fit p-1" >

       <div className="w-1/5  font-medium">{username}</div>
       <div className="w-1/5 ">{ email }</div>
       <div className="w-1/5 ">
            {first_name}
       </div>
       
       <div className="w-1/5  text-clip">{last_name}</div>

        <MemberAction member_id={id} member_can_edit={can_edit} member_board_id={board_id}  />
    </article>
  );
};

export default Member;
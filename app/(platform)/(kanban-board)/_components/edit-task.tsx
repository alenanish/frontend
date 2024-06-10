"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Select from 'react-select';
  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, PenLine, Plus } from "lucide-react";

import React, { useState } from 'react';

import "@/app/style.css";

//

const EditTask = ({  projectId, status, TaskId, team_members, title, priority, deadline, description  }: any) => {
    const [formData, setFormData] = useState({
        task_title: '',
        task_priority: '',
        task_deadline: '',
        task_description: '',
        task_assignee: '',
        task_status: '',
    });

    
  const team =
      [
          { name: 'task_assignee', label: 'Высокий', value: 'high' },
          { name: 'task_assignee', label: 'Средний', value: 'medium' },
          { name: 'task_assignee', label: 'Низкий', value: 'low' },
      ];

    const [selectedPriority, setSelectedPriority] = useState("");
    const [selectedMembers, setSelectedMembers] = useState("");

    const handleSelectChange = (selectedOption: any) => {
        setSelectedPriority(selectedOption['value'])
      };

      const handleSelectedMembers = (selectedOptions: any) => {
        setSelectedMembers(selectedMembers)
      };


    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value,
        task_priority: selectedPriority,
        task_assignee: selectedMembers,
        task_status: status,
        }));
       
    };

    const dialogClose = () => {
        document.getElementById('closeDialog')?.click();
      };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log({
        ...formData,
        });
        dialogClose();  
    };

    const customSelectStyles = {
      container: (baseStyles: any) => ({
        ...baseStyles,
        width: "100%",
        
      }),
      control: (baseStyles: any) => ({
        ...baseStyles,
        fontSize: "14px",
        boxSizing: "border-box",
        border: "1px solid hsl(0, 0%, 89.8%)",
        borderRadius: "6px",
        padding: "1px",
        outline: 'none',
        pointerEvents: 'auto',
        touchAction: 'auto',
        userSelect: 'none',

       "&": {
        borderColor: "none",
        boxShadow: "none",
        transition: 'none'
        },

        "&:focus-within": {
          boxShadow: "rgb(255, 255, 255) 0px 0px 0px 2px, rgb(0, 0, 0) 0px 0px 0px 4px",
        },
        
        "&:hover": {
          borderColor: "none",
          boxShadow: "none",
  
        },
       
        '&:disabled': {
          pointerEvents: 'none',
          opacity: '.5',
          boxShadow: 'none',
        },

        
      }),
      
    
      indicatorSeparator: (baseStyles: any) => ({
        ...baseStyles,
        display: "none",
        }),
      valueContainer: (baseStyles: any, state: any) => ({
        ...baseStyles,
        margin: 0,
        paddingLeft: "0.5rem",
      }),
      singleValue: (baseStyles: any, state: any) => ({
        ...baseStyles,
        margin: 0,
        padding: 0,
        
      }),
      menu: (baseStyles: any) => ({
        ...baseStyles,
        zIndex: 9999,
        scroll: "none",
        }),
      option: (baseStyles: any, { isSelected, isFocused }: any) => ({
        ...baseStyles,
        borderRadius: "4px",
        textAlign: "center",
        padding: "4px",
        backgroundColor: isSelected ? "#A46DDA" : isFocused ? "#ECD4FF" : "transparent",
        color: isSelected ? "white" : "#333",
        cursor: "pointer",
        "&:active": {
        backgroundColor: "#F7716D",
        color: "white",
        },
       
      })
    };

    return (
        <Dialog >
        <DialogTrigger asChild>
            <Button size="icon" type="button" variant="secondary"  className="hover:bg-[#D5DDEE] ">
                < PenLine size={20} className=" group-hover:stroke-[#6D88B0]"/>
            </Button>
        </DialogTrigger>
        <DialogContent className=" h-fit w-max border-2 border-primary self-center justify-self-center md:w-2/6">
            <DialogHeader>
            <DialogTitle> Изменить задачу</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4" >
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="task_title">Название</Label>
                <Input 
                required 
                type="text" 
                defaultValue={title}
                id="task_title" 
                name="task_title"
                placeholder="Введите название" 
                onChange={handleChange}
                />
            </div>

            <div className="flex flex-row w-full justify-between gap-2  ">
                <div className="grid w-fit items-center gap-1.5">
                  <Label htmlFor="task_priority">Приоритет</Label>
                    <Select name="task_priority"
                      placeholder="Приоритет"
                      required
                      defaultInputValue={priority}
                      options={
                          [
                              { name: 'task_priority', label: 'Высокий', value: 'high' },
                              { name: 'task_priority', label: 'Средний', value: 'medium' },
                              { name: 'task_priority', label: 'Низкий', value: 'low' },
                          ]
                      }
                      onChange={handleSelectChange}
                      styles={customSelectStyles}
                      />
                </div>
                
                <div className="grid w-fit items-center gap-1.5">
                <Label htmlFor="task_deadline">Дедлайн</Label>
                <Input 
                    type="date" 
                    required
                    defaultValue={deadline}
                    id="task_deadline" 
                    name="task_deadline"
                    placeholder="Дедлайн" 
                    className="w-fit" 
                    onChange={handleChange}
                />
                </div>
            </div>
            <div className="grid w-fit items-center gap-1.5">
                  <Label htmlFor="task_priority">Назначить</Label>
                    <Select name="task_priority"
                      placeholder="Введите почту"
                      required
                      defaultInputValue={team_members}
                      options={team}
                      onChange={handleSelectedMembers}
                      styles={customSelectStyles}
                      isSearchable={true}
                      isMulti
                      />
                </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="task_description">Описание </Label>
                <Textarea 
                placeholder="Введите описание задачи" 
                id="task_description" 
                defaultValue={description}
                name="task_description"
                onChange={handleChange}
                />
            </div>
            <Button>Сохранить изменения</Button>
            </form>
        </DialogContent>
        </Dialog>
    );
    };

    export default EditTask;

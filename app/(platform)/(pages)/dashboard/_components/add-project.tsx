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
import { ChevronDown, ChevronUp, Plus } from "lucide-react";

import React, { useState } from 'react';

import "@/app/style.css";

const AddProject = () => {
    const [formData, setFormData] = useState({
        project_title: '',
        project_priority: '',
        project_deadline: '',
        project_description: ''
    });

    const [selectedPriority, setSelectedPriority] = useState("");

    const handleSelectChange = (selectedOption: any) => {
        setSelectedPriority(selectedOption['value'])
      };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value,
        project_priority: selectedPriority,
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
        <Dialog>
        <DialogTrigger asChild>
            <Button type="button" variant="default" className="sm:px-2 md:gap-2">                    
            <Plus />
            <span className="hidden md:block">
                Создать проект
            </span>                       
            </Button>
        </DialogTrigger>
        <DialogContent className="border-2 border-primary sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle> Создать проект</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4" >
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="project_title">Название</Label>
                <Input 
                required 
                type="text" 
                id="project_title" 
                name="project_title"
                placeholder="Введите название" 
                onChange={handleChange}
                />
            </div>

            <div className="flex flex-row gap-4 ">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="project_priority">Приоритет</Label>
                    <Select name="project_priority"
                      placeholder="Приоритет"
                      required
                      options={
                          [
                              { name: 'project_priority', label: 'Высокий', value: 'high' },
                              { name: 'project_priority', label: 'Средний', value: 'medium' },
                              { name: 'project_priority', label: 'Низкий', value: 'low' },
                          ]
                      }
                      onChange={handleSelectChange}
                      styles={customSelectStyles}
                      />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                <Label htmlFor="project_deadline">Дедлайн</Label>
                <Input 
                    type="date" 
                    required
                    id="project_deadline" 
                    name="project_deadline"
                    placeholder="Дедлайн" 
                    className="w-fit" 
                    onChange={handleChange}
                />
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="project_description">Описание проекта</Label>
                <Textarea 
                placeholder="Введите описание проекта" 
                id="project_description" 
                name="project_description"
                onChange={handleChange}
                />
            </div>
            <Button>Добавить</Button>
            </form>
        </DialogContent>
        </Dialog>
    );
    };

    export default AddProject;

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import Select from 'react-select';
  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

import React, { useState } from 'react';

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

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log({
        ...formData,
        
        });
        
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
            <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
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

            <div className="flex flex-row">
                <div className="grid w-full items-center gap-1.5">
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
                    />
                </div>
                <div>
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
            <div className="grid w-full gap-1.5">
                <Label htmlFor="project_description">Описание проекта</Label>
                <Textarea 
                placeholder="Введите описание проекта" 
                id="project_description" 
                name="project_description"
                onChange={handleChange}
                />
            </div>
            <Button type="submit" variant="outline">Создать</Button>
            </form>
        </DialogContent>
        </Dialog>
    );
    };

    export default AddProject;

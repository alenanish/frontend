"use client";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react"

import { useState } from "react";

import React from 'react'; 
import axios from 'axios';
import Card  from './_components/card'


const DashboardPage = () => {
    
    const [expanded, setExpanded] = useState(true);
     {/* POST TO PYTHON */}

    const Projects = [
        {id: 1, title: "Проекты", progress: 20, deadline: "12.05.24"},
        {id: 2, title: "Проекты", progress: 70, deadline: "12.05.24"},
        {id: 3, title: "Проекты", progress: 100, deadline: "12.05.24"},
        {id: 4, title: "Проекты", progress: 0, deadline: "12.05.24"},
        {id: 5, title: "Проекты", progress: 0, deadline: "12.05.24"},
        {id: 6, title: "Проекты Проекты Проекты Проекты Проекты", progress: 0, deadline: "12.05.24"},
            
    ]

    return (
        <div className=" flex flex-col gap-2 items-start m-2 p-4" >
            <h1 className="block text-3xl font-medium text-neutral-800">
                Проекты
            </h1>

            <div className="flex w-full flex-row items-center py-2 gap-4 h-max ">
                <div className="flex flex-row gap-2 w-full">
                    {/* Добавить компонент Чип  */}
                    <div>Chip</div>
                    <div>Chip</div>
                    <div>Chip</div>

                </div>
                <div>
                    <Button type="button"  variant="default" className="sm:px-2 md:gap-2" >
                        
                        <Plus />
                        <span className="hidden md:block">
                            Создать проект
                        </span>
                        
                    </Button>
                    
                </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
                {
                    Projects.map((project, index) => (
                        <Card key={index} id={ project.id } title={ project.title } progress={ project.progress } deadline={ project.deadline } />
                    ))   
                }
            </div>
        </div>
    );
};

export default DashboardPage;

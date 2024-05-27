"use client";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react"

import { useState } from "react";

import React from 'react'; 
import axios from 'axios';
import Card from "../_components/card";


const DashboardPage = () => {
    
    const [expanded, setExpanded] = useState(true);
     {/* POST TO PYTHON */}

    const Projects = [
        {id: 1, title: "Проекты", progress: 20, deadline: "12.05.24"},
        {id: 2, title: "Проекты", progress: 70, deadline: "12.05.24"},
        {id: 3, title: "Проекты", progress: 100, deadline: "12.05.24"},
        {id: 4, title: "Проекты", progress: 0, deadline: "12.05.24"},
            
    ]

    return (
        <div className=" transition-all flex flex-col gap-4 items-start m-2 p-4" >
            <h1 className="block text-2xl font-medium">
                Проекты
            </h1>

            <div className="flex w-full flex-row items-center py-2 gap-4 h-max ">
                <div className="flex flex-row gap-2 w-full">
                    <div>Chip</div>
                    <div>Chip</div>
                    <div>Chip</div>

                </div>
                <div>
                    <Button type="button"  variant="default" className="gap-2" >
                        
                        <Plus className="p-0 m-0" />
                        <span className="hidden md:block">
                            Создать проект
                        </span>
                        
                    </Button>
                    
                </div>
            </div>
            
            <div className=" whitespace-pre-line">
                <form>
                    <input 
                    id="title"
                    name="titile"
                    placeholder="Введите название проекта"
                    required
                    className="border border-input rounded-md p-1"
                    />
                </form>
                
            </div>
            <div className="flex flex-wrap gap-4">
                {
                    Projects.map((proj, index) => (
                        <Card key={index} id={ proj.id } title={ proj.title } progress={proj.progress} deadline={ proj.deadline } />
                    ))   
                }
            </div>
        </div>
    );
};

export default DashboardPage;

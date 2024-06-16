"use client";
import React, { useState, Component} from 'react'; 
import axios from 'axios';


import BoardCard from './_components/board-card';
import BoardAction from './_components/board-actions';


const DashboardPage =  () => {
    interface Project {
        id: number,
        title: string,
        description: string,
        progress: number,
    };

    const [Projects, setProjects] = useState([]);

    const apiURL = "http://127.0.0.1:8000/api/boards/";

    const fetchData = async () => {
        const response = await axios.get(apiURL)

        setProjects(response.data) 
        alert(Projects)
    }


    const projects = [ 
        {id: 1, title: "Проект 1", description: "Проект 1",  progress: 20 },
        {id: 2, title: "Проект 2", description: "Проект 2", progress: 70},
        {id: 3, title: "Проект 3", description: "Проект 3", progress: 100},
        {id: 4, title: "Проекты 4", description: "Проект 4", progress: 0},
        {id: 5, title: "Проекты ", description: "", progress: 0},
        {id: 6, title: "Проекты Проекты Проекты Проекты Проекты", description: "", progress: 0},
            
    ]

    

    
    return (

        <div className=" flex flex-col gap-2 items-start m-2 p-4 " >

            <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between ">
                <h1 className="block text-3xl font-medium text-neutral-800">
                    Проекты
                </h1>
                <BoardAction board_id={null} board_title={''} board_description={''} board_progress={0}  />
            </div>
            
            <div className="flex flex-wrap gap-4">
                {
                Projects.length === 0 ? 
                    <span className=' text-neutral-700'>Пока нет поектов</span>:
                    Projects.map((project: Project, index: number) => (
                        <BoardCard key={index} id={ project.id } title={ project.title } description={project.description} progress={ project.progress } />
                    ))   
                }
            </div>
        </div>

    );

};

export default DashboardPage;

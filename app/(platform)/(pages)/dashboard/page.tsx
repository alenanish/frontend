"use client";
import React, { useState, Component, useEffect} from 'react';
import axios from 'axios';


import BoardCard from './_components/board-card';
import BoardAction from './_components/board-actions';
import { useRouter } from 'next/navigation';

interface Project {
  id: number,
  title: string,
  description: string,
  progress: number,
};


const DashboardPage =  () => {
    const [newProjectName, setNewProjectName] = useState<Project>(); 
    const [post, setPost] = useState('')
    const [Projects, setProjects] = useState<Project[]>([]);
    const apiURL = "http://localhost:8000/api/boards/";
    const router = useRouter();

    const fetchData = async () => {
        try {
          const response = await axios.get(apiURL, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('auth'),
            }
          })
          setProjects(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id : number) => {
      try {
        await axios.delete(`http://localhost:8000/api/boards/${id}/`, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth'),
          }
        });
        
        } catch (error) {
        console.error('Ошибка при удалении проекта:', error);
      }
      setProjects(Projects.filter((project) => project.id !== id));
      router.refresh();
    };
  
    return (

<div className="flex flex-col gap-2 items-start m-2 p-4 h-full" >

    <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between ">
        <h1 className="block text-3xl font-medium text-neutral-800">
                    Проекты
                </h1>
                <BoardAction board_id={null} board_title={''} board_description={''} board_progress={0} refreshPage={fetchData}  />
            </div>

            <div className="flex flex-wrap gap-4">
                {
                Projects.length === 0 ?
                    <span className=' text-neutral-700'>Пока нет поектов</span>:
                    Projects.map((project: Project, index: number) => (
                        <BoardCard key={index} id={ project.id } title={ project.title } description={project.description} progress={ project.progress } handleDelete={handleDelete} refreshPage={fetchData}/>
                    ))
                }
            </div>
        </div>

    );

};

export default DashboardPage;

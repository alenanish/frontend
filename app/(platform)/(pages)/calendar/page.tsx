"use client";

import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Calendar from './_components/calendar';


const CalendarPage = () => {


    return (
        <div className=" flex flex-col gap-2 items-start m-2 p-4 h-full w-full" >

            <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between ">
                <h1 className="block text-3xl font-medium text-neutral-800">
                    
                </h1>
               
            </div>
            
            <div className="bg-white flex flex-wrap gap-4 border-2 border-primary items-stretch p-3
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md h-full w-full">
                            <Calendar />
                    
                
               
            </div>
        </div>
    );
};

export default CalendarPage;

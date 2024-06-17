"use client";

import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Calendar from './_components/calendar';


const CalendarPage = () => {


    return (
        <div className="flex flex-col gap-2 items-start m-2 p-4 h-full" >
            
            <div className="flex w-full flex-row items-center py-2 gap-4 h-max justify-between ">
                <h1 className="block text-3xl font-medium text-neutral-800">
                    Календарь
                </h1>
               
            </div>
            
            <div className="bg-white border-2 border-primary p-3
                         shadow-[0px_4px_8px_rgba(0,0,0,0.5)] rounded-md flex h-full w-full ">
                            <Calendar />
            </div>
        </div>
    );
};

export default CalendarPage;

"use client"

import AddTask from "../../../_components/add-task";


export default function BoardPage({ params }: { params: { projectId: any } }) {

  return (
  <div className="">
    <div className="w-fit h-fit absolute top-10 right-6">
      <AddTask projectId={params.projectId} />

    </div>

   
  
  
  </div>

  );
};
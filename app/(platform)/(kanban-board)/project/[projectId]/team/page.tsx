"use client"


export default function TeamPage({ params }: { params: { projectId: any } }) {

  return (
  <div>My project: {params.projectId}</div>

  );
};
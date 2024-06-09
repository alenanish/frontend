"use client"


export default function OverviewPage({ params }: { params: { projectId: any } }) {

  return (
  <div>My project: {params.projectId}</div>

  );
};
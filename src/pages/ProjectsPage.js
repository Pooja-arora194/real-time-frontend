import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../api/projectApi';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage(){
 const [items,setItems] = useState([]);
 const nav = useNavigate();
 useEffect(()=>{ getProjects().then(r=>setItems(r.data)); },[]);
 return (
  <div className='container py-5'>
   <div className='text-center mb-5'>
    <h1 className='fw-bold'>Projects</h1>
    <p className='text-muted'>Manage and track your active workspaces</p>
   </div>
   <div className='row justify-content-center'>
    <div className='col-lg-8'>
      {items.map(p=><ProjectCard key={p._id} project={p} onOpen={(id)=>nav(`/board/${id}`)} />)}
    </div>
   </div>
  </div>
 );
}
export default function ProjectCard({project,onOpen}){
 return (
  <div className='card border-0 shadow-sm mb-3 rounded-4'>
   <div className='card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3'>
    <div>
      <h5 className='mb-1 fw-bold'>{project.name}</h5>
      <small className='text-muted'>Open workspace</small>
    </div>
    <button className='btn btn-primary px-4 rounded-pill' onClick={()=>onOpen(project._id)}>Open</button>
   </div>
  </div>
 );
}
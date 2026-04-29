import { create } from 'zustand';
import { getTasks, updateTaskStatus } from '../api/taskApi';
export const useTaskStore = create((set,get)=>( {
tasks:[],
loading:false,
error:'',
fetchTasks: async(projectId)=>{
set({loading:true});
const res = await getTasks(projectId);
set({tasks:res.data,loading:false});
},
moveTask: async(id,status)=>{
await updateTaskStatus(id,status);
},
applyRealtime:(task)=>{
const items = get().tasks.map(t=>t._id===task._id ? task : t);
set({tasks:items});
}
}));
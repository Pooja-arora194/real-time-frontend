import { useState } from 'react';

export default function LoginForm({onSubmit}){
 const [form,setForm] = useState({email:'',password:''});
 const change = e => setForm({...form,[e.target.name]:e.target.value});
 return (
  <form onSubmit={(e)=>{e.preventDefault();onSubmit(form)}} className='d-grid gap-3'>
   <input name='email' className='form-control' placeholder='Email' value={form.email} onChange={change} />
   <input name='password' type='password' className='form-control' placeholder='Password' value={form.password} onChange={change} />
   <button className='btn btn-primary w-100'>Login</button>
  </form>
 );
}
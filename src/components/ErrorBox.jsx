export default function ErrorBox({message}){
if(!message) return null;
return <p style={{color:'red'}}>{message}</p>;
}

"use client"
import "./globals.css"
import React,{ useState,useEffect } from "react"
import { Inter } from 'next/font/google'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
 
const inter = Inter({ subsets: ['latin'] })

const Taskinput=({onadd})=>{
  const [taskname,setTaskname]=useState("");
  const [taskdescription,setTaskdescription]=useState("");
  
  const handleChange=(e)=>{
    e.preventDefault();
    if(taskname.trim()&&taskdescription.trim()){
      onadd({taskname,taskdescription,completed:false});
      setTaskname("");
      setTaskdescription("");
    }
  }
  
  return(<div className="border-2 border-gray-300  drop-shadow-2xl mx-60 rounded-md mt-4">
    <form onSubmit={handleChange} className="grid px-6 py-7 drop-shadow-2xl" >
      <h2 className="text-center">Input newtask</h2>
      <label>Task:</label>
      <input type="text" onChange={(e)=>setTaskname(e.target.value)} value={taskname} className="rounded-lg"/>
      <label>Task description:</label>
      <textarea onChange={(e)=>setTaskdescription(e.target.value)} value={taskdescription} className="rounded-lg"></textarea>
      <button type="submit" className="rounded-lg py-2 border-blue-300 bg-blue-300 mx-72 mt-3 hover:bg-blue-400 ">Submit</button>
      
    </form>
  </div>)
}

const Taskitem=React.memo(({markcomplete,deletebutton,task})=>{
  const [timestamp, setTimestamp] = useState("");
  
  useEffect(() => {
    const currentTimestamp = new Date().toLocaleString(); 
    setTimestamp(currentTimestamp);
  }, []);
  return(<div >
      <ul className="flex gap-3">
        <li className={`${task.completed?'line-through':'no-underline'}`}>{task.taskname}  -  {task.taskdescription}</li>
        <input type="checkbox" onChange={markcomplete} checked={task.completed}/>
        <p>{timestamp}</p>
        <button onClick={deletebutton}><FontAwesomeIcon icon={faTrashCan} className="text-red-500"/></button>
      </ul>
  </div>)
})

const Tasklist=React.memo(({tasks,markcomplete,deletebutton})=>{
 
  return(<div className="border-2 border-gray-300 mx-96 mt-4 ">
    <ul>
      {tasks.map((task,idx)=>(
        <Taskitem key={idx} task={task} markcomplete={()=>markcomplete(idx)} deletebutton={()=>deletebutton(idx)}/>
      ))}
    </ul>
  </div>)
})
const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div>
      <h1>Time: {time} </h1>
    </div>
  );
};
export default function App(){
  const [tasks,setTasks]=useState([]);
 

  const add=(newtask)=>{
    setTasks((prevtasks)=>[...prevtasks,newtask])
  }

  const deletebutton=(taskidx)=>{
    setTasks((prevtasks)=>prevtasks.filter((_,i)=>i!==taskidx))
  }
  const markcomplete=(taskidx)=>{
    setTasks((prevtasks)=>prevtasks.map((task,idx)=>
      idx===taskidx?{...task,completed:!task.completed}:task
    ))
  }
  return(
  <div className={inter.className}>
    <h1 className="flex"><Clock/></h1>
    <Taskinput onadd={add}/>
    <Tasklist tasks={tasks} markcomplete={markcomplete} deletebutton={deletebutton}/>
  </div>)
}
import React, { useState } from 'react';

function Todolist(props) {
    const [todo,setTodo] = useState([]);
    const [task,setTask] =  useState("");
    const [taskedit,setTaskedit] =  useState("");
    const [indextask,setIndextask] =  useState(null);
    const addTask= (e)=>{
        e.preventDefault();
        if(task){
            setTodo([...todo, {name : task , status: false}]);
            setTask([]);
        }
    }
    const handdelete = (index) =>{
        const newdelete = [...todo];
        newdelete.splice(index,1);
        setTodo(newdelete);
    }
    const edittask = (index,item) =>{
        setIndextask(index);
        setTaskedit(item.name);
    }
    const update = () =>{
        if(taskedit){
            const newTodo = [...todo];
            newTodo[indextask].name = taskedit;
            setTodo(newTodo);
            setIndextask(null);

        }
    }
    const confirme = (index) =>{
       const newTodo = [...todo];
        newTodo[index].status = true;
        setTodo(newTodo);
    }

console.log(todo);
    return (
        <div>
            <div className="container">
                <h1 className='text-center text-success'>ToDoList</h1>
                <form class="mt-3 d-flex ">
                    <div class="input-group mb-3 w-25">
                        <input value={task} onChange={(e)=>setTask(e.target.value)} type="text" class="form-control" placeholder="Input" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button onClick={addTask} class="btn btn-outline-primary   ms-3" type="button" id="button-addon2">Button</button>
                    </div>
                </form>
                {
                    todo.map((item,index)=>(
                        <div className=" task d-flex justify-content-between align-items-center bg-danger mt-3  p-3 ">
                        <h5>{index + 1}</h5>
                        {
                            index == indextask?(
                                <input onChange={(e)=>setTaskedit(e.target.value)} value={taskedit}  type="text" />
                            ):(
                                <p className={`color-white  ${item.status ? "clack" : ""}`}>{item.name}</p> 
                            )

                        }

                        <div className="icon">
                            {
                                index == indextask?(<button onClick={update}>Update</button>
                                ):(<> <button className='bg-success ' onClick={() => confirme(index)}><i className="fa-solid fa-check color-Light "></i></button>
                                    <button onClick={() => edittask(index,item)} className='bg-bg-warning'> <i className="fa-solid fa-pen-to-square "></i></button>
                                    <button onClick={() =>handdelete(index)} className='bg-info'> <i class="fa-solid fa-trash "></i></button></>)
                            }                      
                        </div>
                    </div>
    
                    ))
                    
                }
                
            </div>

        </div>
    );
}

export default Todolist;
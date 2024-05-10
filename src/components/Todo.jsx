import { useState,useEffect, useContext } from "react";
import axios from "axios";
import Context from "../ContextApi/ContextProvider";
function Todo(){
    const {URL} = useContext(Context)
    const [todoList, setTodoList] = useState([]); 
    const [editableId, setEditableId] = useState(null); 
    const [editedTask, setEditedTask] = useState(""); 
    const [editedStatus, setEditedStatus] = useState(""); 
    const [newTask, setNewTask] = useState(""); 
    const [newStatus, setNewStatus] = useState(""); 
    const [newDeadline, setNewDeadline] = useState(""); 
    const [editedDeadline, setEditedDeadline] = useState(""); 
   
     useEffect(() => { 
        async function getdata()
        {
        const id =localStorage.getItem('user')
        const result = await axios.get(`${URL}todo/getTodo/${id}`,{
            
        })
        setTodoList(result.data) 
    } getdata()});

    const toggleEditable = (id) => { 
        const rowData = todoList.find((data) => data._id === id); 
        if (rowData) { 
            setEditableId(id); 
            setEditedTask(rowData.task); 
            setEditedStatus(rowData.status); 
            setEditedDeadline(rowData.deadline || ""); 
        } else { 
            setEditableId(null); 
            setEditedTask(""); 
            setEditedStatus(""); 
            setEditedDeadline(""); 
        } 
    }; 

    const addTask = (e) => { 
        e.preventDefault(); 
        if (!newTask || !newStatus || !newDeadline) { 
            alert("All fields must be filled out."); 
            return; 
        } 
  
        axios.post(`${URL}todo/addTodo`, { 
            userId: localStorage.getItem('user'),
            task: newTask, 
            status: newStatus, 
            deadline: newDeadline }) 
            .then(res => { 
                console.log(res); 
                window.location.reload(); 
            }) 
    };

    const saveEditedTask = (id) => { 
        const editedData = { 
            task: editedTask, 
            status: editedStatus, 
            deadline: editedDeadline, 
        }; 
  
        if (!editedTask || !editedStatus || !editedDeadline) { 
            alert("All fields must be filled out."); 
            return; 
        } 
  
        axios.put(`${URL}todo/editTodo/${id}`, editedData) 
            .then(result => { 
                console.log(result); 
                setEditableId(null); 
                setEditedTask(""); 
                setEditedStatus(""); 
                setEditedDeadline(""); 
                window.location.reload(); 
            }) 
            .catch(err => console.log(err)); 
    };

    const deleteTask = (id) => { 
        axios.post(`${URL}todo/removeTodo`,{
            id: id
        }) 
            .then(result => { 
                console.log(result); 
                window.location.reload(); 
            }) 
            .catch(err => 
                console.log(err) 
            ) 
    } 
    return(
        <>
        <div className=" m-5 font container d-flex flex-column justify-content-center align-items-center">
        <div className="todo-container d-flex flex-row flex-wrap  gap-1 m-1 ">
        <form>
        <label htmlFor="text"> Todo Name</label>
            <input id='text' type="text"  onChange={(e) => setNewTask(e.target.value)} ></input>
            <label htmlFor="status"> Status</label>
            <input id='status' type="text"   onChange={(e) => setNewStatus(e.target.value)} ></input>
            <label htmlFor="deadline" >Deadline</label>
            <input className="form-control" type="datetime-local" onChange={(e) => setNewDeadline(e.target.value)} /> 
            <button onClick={addTask} >Add TODO</button>
        </form></div>

                    <h2 className=" container font text-center">Todo List</h2> 
                    <div className="table-responsive"> 
                        <table className="table table-bordered"> 
                            <thead className="color"> 
                                <tr> 
                                    <th>Task</th> 
                                    <th>Status</th> 
                                    <th>Deadline</th> 
                                    <th>Actions</th> 
                                </tr> 
                            </thead> 
                            {Array.isArray(todoList) ? ( 
                                <tbody> 
                                    {todoList.map((data) => ( 
                                        <tr key={data._id}> 
                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        value={editedTask} 
                                                        onChange={(e) => setEditedTask(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    data.task 
                                                )} 
                                            </td> 
                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        value={editedStatus} 
                                                        onChange={(e) => setEditedStatus(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    data.status 
                                                )} 
                                            </td> 
                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <input 
                                                        type="datetime-local"
                                                        className="form-control"
                                                        value={editedDeadline} 
                                                        onChange={(e) => setEditedDeadline(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    data.deadline ? new Date(data.deadline).toLocaleString() : ''
                                                )} 
                                            </td> 
  
                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <button className="btn btn-sm" onClick={() => saveEditedTask(data._id)}> 
                                                        Save 
                                                    </button> 
                                                ) : ( 
                                                    <button className="btn btn-sm" onClick={() => toggleEditable(data._id)}> 
                                                        Edit 
                                                    </button> 
                                                )} 
                                                <button className="btn btn-sm ml-1" onClick={() => deleteTask(data._id)}> 
                                                    Delete 
                                                </button> 
                                            </td> 
                                        </tr> 
                                    ))} 
                                </tbody> 
                            ) : ( 
                                <tbody> 
                                    <tr> 
                                        <td colSpan="4">Loading products...</td> 
                                    </tr> 
                                </tbody> 
                            )} 
                        </table> 
                        </div></div>
                        </>
    )
}
export default Todo;
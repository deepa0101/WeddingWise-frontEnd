import { useState,useEffect,useContext } from "react";
import axios from "axios";
import Context from "../ContextApi/ContextProvider";
function BudgetTrack(){
    const {URL} = useContext(Context)
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null); 
    const [editedExpense, setEditedExpense] = useState(""); 
    const [editedAmount, setEditedAmount] = useState(""); 
    const [newExpense, setnewExpense] = useState(""); 
    const [newAmount, setNewAmount] = useState(""); 
    const [expenseTotal, setExpenseTotal] = useState()
     useEffect(() => { 
        async function getdata()
        {
        const id =localStorage.getItem('user')
        const result = await axios.get(`${URL}budget/getBudget/${id}`,{
            
        })
        setTodoList(result.data)
    
    } getdata()});

    useEffect(()=>{
        const array = todoList.map(e=>e.Amount)
        if(array.length==0){
            setExpenseTotal(0);
       } else{
             setExpenseTotal(array.reduce((a,c)=>a+parseInt(c)));
       } 
    },[todoList])

    const toggleEditable = (id) => { 
        const rowData = todoList.find((data) => data._id === id); 
        if (rowData) { 
            setEditableId(id); 
            setEditedExpense(rowData.task); 
            setEditedAmount(rowData.status);  
        } else { 
            setEditedExpense(""); 
            setEditedAmount("");  
        } 
    }; 

    const addExpense = (e) => { 
        e.preventDefault(); 
        if (!newExpense || !newAmount) { 
            alert("All fields must be filled out."); 
            return; 
        } 
  
        axios.post(`${URL}budget/addBudget`, { 
            userId: localStorage.getItem('user'),
            expenseName: newExpense, 
            amount: newAmount, }) 
            .then(res => { 
                console.log(res); 
                window.location.reload(); 
            }) 
    };

    const saveEditedExpense = (id) => { 
        const editedData = { 
            expenseName: editedExpense, 
            amount: editedAmount, 
        }; 
  
        if (!editedExpense || !editedAmount) { 
            alert("All fields must be filled out."); 
            return; 
        } 
  
        axios.put(`${URL}budget/editBudget/${id}`, editedData) 
            .then(result => { 
                console.log(result);  
                setEditableId(id);  
                setEditedExpense(""); 
                setEditedAmount(""); 

                window.location.reload(); 
            }) 
            .catch(err => console.log(err)); 
    };

    const deleteTask = (id) => { 
        axios.post(`${URL}budget/removeBudget`,{
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
            <div>`You have Spent <b>Rs.{expenseTotal}</b> on your Wedding till now....` </div>
            <div className=" todo-container d-flex flex-column flex-wrap gap-1 m-1 ">  
            <form>
                <label htmlFor="text"> Expense Name</label>
            <input id='text' type="text" onChange={(e) => setnewExpense(e.target.value)}></input>
            <label htmlFor="text"> Amount </label>
            <input id='text' type="text" onChange={(e) => setNewAmount(e.target.value)}></input>
            <button onClick={addExpense}>Add Expense</button>
            </form>
            </div>
            
            <h2 className=" container font text-center">Todo List</h2> 
                    <div className="table-responsive"> 
                        <table className="table table-bordered"> 
                            <thead className="color"> 
                                <tr> 
                                    <th>Expense</th> 
                                    <th>Amount</th> 
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
                                                        value={editedExpense} 
                                                        onChange={(e) => setEditedExpense(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    data.Name 
                                                )} 
                                            </td> 
                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        value={editedAmount} 
                                                        onChange={(e) => setEditedAmount(e.target.value)} 
                                                    /> 
                                                ) : ( 
                                                    data.Amount 
                                                )} 
                                            </td> 
                                            <td> 
                                                {editableId === data._id ? ( 
                                                    <button className="btn btn-sm" onClick={() => saveEditedExpense(data._id)}> 
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
export default  BudgetTrack;
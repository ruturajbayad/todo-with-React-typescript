import { useTodos } from "../store/todos"
import { useSearchParams } from "react-router-dom";


const Todos = () => {
    const {todos, handleTodoDelete, toggleTodoAsCompleted} = useTodos();
    const [searchParams] = useSearchParams();
    let todos̥Data = searchParams.get("todos");
    // console.log("🚀 ~ file: todos.tsx:10 ~ Todos ~ todos̥Data:", todos̥Data)


    let filterData = todos;

    if(todos̥Data === "active"){
        filterData = filterData.filter((task) => !task.completed  )
    }

    if(todos̥Data === "completed"){
        filterData = filterData.filter((task) => task.completed  )
    }

  return (
    <ul className="main-task">
        {
            filterData.map((todos) => {
                return <li key={todos.id}>
                    <input type="checkbox" id={`todos-${todos.id}`} 
                    checked={todos.completed}
                    onChange={() => toggleTodoAsCompleted(todos.id)}
                    />
                    <label htmlFor={`todos-${todos.id}`}>{todos.task}</label>
                    {
                        todos.completed && (
                            <button type="button"
                            onClick={() => handleTodoDelete(todos.id)}
                            >Delete</button>
                        )
                    }
                </li>
            })
        }
    </ul>
  )
}

export default Todos
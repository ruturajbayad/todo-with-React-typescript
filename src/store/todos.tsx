import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
    children: ReactNode
}

export type TodosContet = {
    todos:Todo[];
    handleAddTodo:(task:string) => void;
    toggleTodoAsCompleted:(id:string) => void;
    handleTodoDelete:(id:string) => void;
}

export type Todo = {
    id:string;
    task:string;
    completed:boolean;
    createdAt:Date;
}
export const todoContext = createContext<TodosContet | null>(null);

export const TodosProvider = ({children}:TodosProviderProps) => {
    
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem("todos") || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }
    });

    const handleAddTodo = (task:string) => {
        setTodos((prev) => {
            let newTodos:Todo[] = [
                {
                id:Math.random().toString(),
                task:task,
                completed:false,
                createdAt:new Date()
            },
            ...prev
            ]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
        console.log(todos);
    }

    const toggleTodoAsCompleted = (id:string) => {
        setTodos((prev) => {
            let newTodos = prev.map((todo) => {
                if(todo.id === id){
                    return {...todo, completed:!todo.completed}
                } 
                return todo
            }) 
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }

    const handleTodoDelete = (id:string) => {
        setTodos((prev) => {
            let newNode = prev.filter((todo) => todo.id !== id)
            localStorage.setItem("todos", JSON.stringify(newNode));
            return newNode
        })
    }
    
     return <todoContext.Provider value={{todos, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete}}>
        {children}
    </todoContext.Provider>
}

export const useTodos = () =>  {
    const TodoConcumer = useContext(todoContext)
    if(!TodoConcumer){
        throw new Error("useTodos must be used within a TodosProvider")
    }
    return TodoConcumer;
}
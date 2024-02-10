import './App.css'
import AddTodo from './components/AddTodo'
import Navbar from './components/Navbar'
import Todos from './components/todos'

function App() {


  return (
    <>
    
      <main>
      <h1>Todo With React + Typescript</h1>
      <br />
      <br />
      <br />
        <Navbar />
        <AddTodo />
        <Todos />
      </main>
    </>
  )
}

export default App

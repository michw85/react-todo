import React, {useEffect} from "react"
import TodoList from "./Todo/TodoList"
import Context from "./context"
import Loader from './Loader'
import AddTodo from './Todo/AddTodo'
import Modal from "./Modal/Modal" // React.Component

// Lazy load
// const AddTodo = React.lazy( () => import('./Todo/AddTodo'))

// Hooks 
function App() {
  const [todos, setTodos] = React.useState([
    // Handmade todos
    // { id: 1, completed: false, title: "Купить хлеб" },
    // { id: 2, completed: true, title: "Купить молоко" },
    // { id: 3, completed: false, title: "Купить сахар" },
  ])
  const [loading, setLoading] = React.useState(true)

  // Todos from fetch (https://jsonplaceholder.typicode.com/) 
  // Loader (https://loading.io/css/) 2 sec
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() =>{
          setTodos(todos)
          setLoading(false)
        }, 2000)
        
      })
  }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeTodo (id){
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title){
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          complited: false
        }
      ])
    )
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1>React Todo list</h1>
        <Modal />

        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo}/>
        </React.Suspense>
        
        {loading && <Loader />}
        {todos.length ? (
        <TodoList todos={todos} onToggle={toggleTodo} />
        ) : (
          loading ? null : <p>No todos!</p>   
        )}
      </div>
    </Context.Provider>
  )
}

export default App

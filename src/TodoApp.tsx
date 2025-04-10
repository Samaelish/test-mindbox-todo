import { useState } from 'react'
import { Todo } from './types'
import TodoInput from './components/TodoInput'
import TodoColumn from './components/TodoColumn'
import TodoStats from './components/TodoStats'

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const remaining = todos.filter(todo => !todo.completed).length

  return (
    <div className='max-w-2xl mx-auto p-4 bg-slate-50'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Todos</h1>

      <TodoInput value={input} onAdd={addTodo} onChange={setInput} />

      {/* Основной список тудушек */}
      <TodoColumn
        title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks`}
        todos={filteredTodos}
        onToggle={toggleTodo}
      />

      {/* Количество оставшихся тудушек и очистка */}
      <TodoStats remaining={remaining} onClearCompleted={clearCompleted} />
      {/* Кнопки фильтрации */}
      <div className='flex gap-2'>
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 px-4 py-2 rounded ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`flex-1 px-4 py-2 rounded ${
            filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`flex-1 px-4 py-2 rounded ${
            filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

export default TodoApp

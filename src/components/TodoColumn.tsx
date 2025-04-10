import { FC } from 'react'
import { Todo } from '../types'
import TodoItem from './TodoItem'

interface Props {
  title: string
  todos: Todo[]
  onToggle: (id: number) => void
}

// Компонент колонки для отображения задач
const TodoColumn: FC<Props> = ({ title, todos, onToggle }) => (
  <div className='bg-gray-100 p-4 rounded'>
    {/* Заголовок колонки с динамическим количеством задач */}
    <h2 className='font-bold mb-2'>
      {title} ({todos.length})
    </h2>
    {/* Список задач */}
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  </div>
)

export default TodoColumn

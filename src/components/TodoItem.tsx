import { FC } from 'react'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: number) => void
}

const TodoItem: FC<Props> = ({ todo, onToggle }) => (
  <li className='flex items-center gap-2 mb-1'>
    <label htmlFor={`todo-item-${todo.id}`} className='flex items-center gap-2 cursor-pointer'>
      <input
        id={`todo-item-${todo.id}`}
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className='absolute opacity-0 h-0 w-0'
      />
      {/* Custom checkbox */}
      <span
        className={`
          relative flex-shrink-0
          w-5 h-5 border-2 rounded-full
          transition-colors duration-200
          ${
            todo.completed
              ? 'bg-green-500 border-green-600'
              : 'border-gray-300 hover:border-gray-400 group-hover:border-gray-400'
          }
        `}
      >
        {/* Checkmark icon */}
        <svg
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-3 h-3 text-white ${todo.completed ? 'opacity-100' : 'opacity-0'}`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </svg>
      </span>
      {/* Todo text */}
      <span className={todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}>{todo.text}</span>
    </label>
  </li>
)

export default TodoItem

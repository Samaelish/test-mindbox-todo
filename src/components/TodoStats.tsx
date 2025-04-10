import { FC } from 'react'

interface Props {
  remaining: number
  onClearCompleted: () => void
}

const TodoStats: FC<Props> = ({ remaining, onClearCompleted }) => (
  <div className='my-4 flex justify-between items-center'>
    <span>Tasks remaining: {remaining}</span>
    <button
      onClick={onClearCompleted}
      className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'
    >
      Clear Completed
    </button>
  </div>
)

export default TodoStats

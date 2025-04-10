import { FC } from 'react'

interface Props {
  value: string
  onAdd: () => void
  onChange: (value: string) => void
}

const TodoInput: FC<Props> = ({ value, onAdd, onChange }) => (
  <div className='flex mb-6'>
    <input
      type='text'
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && onAdd()}
      placeholder='What needs to be done?'
      className='flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
    />
    <button onClick={onAdd} className='bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors'>
      Add
    </button>
  </div>
)

export default TodoInput

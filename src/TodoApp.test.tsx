import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoApp from './TodoApp'

describe('Todos', () => {
  beforeEach(() => {
    render(<TodoApp />)
  })

  const addTodo = async (text: string) => {
    const input = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByRole('button', { name: 'Add' })

    await userEvent.type(input, text)
    await userEvent.click(addButton)
  }

  it('renders initial state correctly', () => {
    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    expect(screen.getByText('Tasks remaining: 0')).toBeInTheDocument()
  })

  it('adds a new todo', async () => {
    await addTodo('Buy milk')
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Tasks remaining: 1')).toBeInTheDocument()
  })

  it('toggles todo status', async () => {
    await addTodo('Learn React')
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)

    expect(checkbox).toBeChecked()
    expect(screen.getByText('Learn React')).toHaveClass('line-through')
    expect(screen.getByText('Tasks remaining: 0')).toBeInTheDocument()
  })

  it('filters todos correctly', async () => {
    await addTodo('Active task')
    await addTodo('Completed task')
    const checkboxes = screen.getAllByRole('checkbox')
    await userEvent.click(checkboxes[1])

    // Test Active filter
    await userEvent.click(screen.getByRole('button', { name: 'Active' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Active task')).toBeInTheDocument()

    // Test Completed filter
    await userEvent.click(screen.getByRole('button', { name: 'Completed' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Completed task')).toBeInTheDocument()

    // Test All filter
    await userEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('clears completed todos', async () => {
    await addTodo('Keep this')
    await addTodo('Delete this')
    const checkboxes = screen.getAllByRole('checkbox')
    await userEvent.click(checkboxes[1])

    await userEvent.click(screen.getByRole('button', { name: 'Clear Completed' }))

    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Tasks remaining: 1')).toBeInTheDocument()
  })

  it('prevents adding empty todos', async () => {
    const input = screen.getByPlaceholderText('What needs to be done?')
    const addButton = screen.getByRole('button', { name: 'Add' })

    // Test with empty input
    await userEvent.click(addButton)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)

    // Test with whitespace
    await userEvent.type(input, '   ')
    await userEvent.click(addButton)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('adds todo with Enter key', async () => {
    const input = screen.getByPlaceholderText('What needs to be done?')
    await userEvent.type(input, 'New task{enter}')
    expect(screen.getByText('New task')).toBeInTheDocument()
  })

  it('updates remaining count correctly', async () => {
    await addTodo('Task 1')
    await addTodo('Task 2')
    await addTodo('Task 3')

    const checkboxes = screen.getAllByRole('checkbox')
    await userEvent.click(checkboxes[0])
    await userEvent.click(checkboxes[1])

    expect(screen.getByText('Tasks remaining: 1')).toBeInTheDocument()
  })
})

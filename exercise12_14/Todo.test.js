import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    text: 'example todo for testing',
    done: false
  }
  /* const todo = {
    text: 'This will fail the test',
    done: false
  } */

  render(<Todo todo={todo} />)

  const element = screen.getByText('example todo for testing')
  expect(element).toBeDefined()
})
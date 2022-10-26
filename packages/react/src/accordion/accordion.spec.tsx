import { render, screen } from '@testing-library/react'

test('just works', async () => {
  render(<h1>hello world</h1>)
  expect(screen.getByRole('heading')).toHaveTextContent('hello world')
})

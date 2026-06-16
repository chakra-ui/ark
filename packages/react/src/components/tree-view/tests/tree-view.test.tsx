import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Basic as ComponentUnderTest } from '../examples/basic.tsx'

describe('TreeView', () => {
  it('should render a leaf node correctly', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('row', { name: 'README.md' })).toBeVisible()
  })

  it('should render a branch node correctly', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('row', { name: 'src' })).toBeVisible()
  })

  it('should expand branch node to reveal child leaf node', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('row', { name: 'src' })).toBeVisible()
    await userEvent.click(screen.getByRole('row', { name: 'src' }))

    await waitFor(() => expect(screen.getByText('app.tsx')).toBeVisible())
  })
})

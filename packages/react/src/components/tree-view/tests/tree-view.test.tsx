import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { Basic as ComponentUnderTest } from '../examples/basic'

describe('TreeView', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = await act(async () => render(<ComponentUnderTest />))
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('should render a leaf node correctly', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('treeitem', { name: 'README.md' })).toBeVisible()
  })

  it('should render a branch node correctly', () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('treeitem', { name: 'src' })).toBeVisible()
  })

  it('should expand branch node to reveal child leaf node', async () => {
    render(<ComponentUnderTest />)
    expect(screen.getByRole('treeitem', { name: 'src' })).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'src' }))

    await waitFor(() => expect(screen.getByText('app.tsx')).toBeVisible())
  })
})

import { render, screen } from '@solidjs/testing-library'
import { ComponentUnderTest } from './basic'

describe('TreeView', () => {
  it('should render a leaf node correctly', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByRole('treeitem', { name: 'README.md' })).toBeInTheDocument()
  })

  it('should render a branch node correctly', () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByRole('treeitem', { name: 'src' })).toBeInTheDocument()
  })

  it('should expand branch node to reveal child leaf node', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByRole('treeitem', { name: 'src' })).toBeInTheDocument()

    const trigger = screen.getByRole('button', { name: 'src' })
    trigger.click()

    expect(await screen.findByText('app.tsx')).toBeInTheDocument()
  })
})

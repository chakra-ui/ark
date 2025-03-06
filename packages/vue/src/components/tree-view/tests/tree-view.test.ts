import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from '../examples/basic.vue'

describe('TreeView', () => {
  it('should render a leaf node correctly', () => {
    render(ComponentUnderTest)
    expect(screen.getByRole('treeitem', { name: 'README.md' })).toBeVisible()
  })

  it('should render a branch node correctly', () => {
    render(ComponentUnderTest)
    expect(screen.getByRole('treeitem', { name: 'src' })).toBeVisible()
  })

  it('should expand branch node to reveal child leaf node', async () => {
    render(ComponentUnderTest)
    expect(screen.getByRole('treeitem', { name: 'src' })).toBeVisible()
    await userEvent.click(screen.getByRole('button', { name: 'src' }))

    expect(screen.getByText('app.tsx')).toBeVisible()
  })
})

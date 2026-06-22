import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import ComponentUnderTest from '../examples/basic.vue'

describe('TreeView', () => {
  it('should render a leaf node correctly', () => {
    render(ComponentUnderTest)
    expect(screen.getByRole('row', { name: 'README.md' })).toBeVisible()
  })

  it('should render a branch node correctly', () => {
    render(ComponentUnderTest)
    expect(screen.getByRole('row', { name: 'src' })).toBeVisible()
  })

  it('should expand branch node to reveal child leaf node', async () => {
    render(ComponentUnderTest)
    expect(screen.getByRole('row', { name: 'src' })).toBeVisible()
    await userEvent.click(screen.getByRole('row', { name: 'src' }))

    expect(screen.getByText('app.tsx')).toBeVisible()
  })
})

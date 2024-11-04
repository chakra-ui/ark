import { cleanup, render, screen, waitFor } from '@testing-library/react/pure'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { TreeView } from '..'
import { getExports, getParts } from '../../../setup-test'
import { Basic as ComponentUnderTest } from '../examples/basic'
import { treeViewAnatomy } from '../tree-view.anatomy'

describe('TreeView  / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(treeViewAnatomy).filter((x) => x.includes('branchTrigger')))(
    'should render part %s',
    async (part) => {
      expect(document.querySelector(part)).toBeInTheDocument()
    },
  )

  it.each(getExports(treeViewAnatomy))('should export %s', async (part) => {
    expect(TreeView[part]).toBeDefined()
  })
})

describe('TreeView', () => {
  afterEach(() => {
    cleanup()
  })
  it('should not have any accessibility violations', async () => {
    const { container } = render(<ComponentUnderTest />)
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
    userEvent.click(screen.getByRole('button', { name: 'src' }))

    await waitFor(() => expect(screen.getByText('app.tsx')).toBeVisible())
  })
})

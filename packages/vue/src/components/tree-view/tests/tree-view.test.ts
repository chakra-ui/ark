import userEvent from '@testing-library/user-event'
import { cleanup, render, screen } from '@testing-library/vue'
import { TreeView, treeViewAnatomy } from '..'
import { getExports, getParts } from '../../../setup-test'
import ComponentUnderTest from '../examples/basic.vue'

describe('TreeView / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  render(ComponentUnderTest)

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

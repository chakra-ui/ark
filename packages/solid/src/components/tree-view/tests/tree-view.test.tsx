import { cleanup, render, screen } from '@solidjs/testing-library'
import { TreeView, treeViewAnatomy } from '..'
import { getExports, getParts } from '../../../setup-test'
import { Basic as ComponentUnderTest } from '../examples/basic'

describe('TreeView / Parts & Exports', () => {
  afterAll(() => {
    cleanup()
  })

  it.each(getParts(treeViewAnatomy).filter((x) => x.includes('branchTrigger')))(
    'should render part %s',
    async (part) => {
      render(() => <ComponentUnderTest />)
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

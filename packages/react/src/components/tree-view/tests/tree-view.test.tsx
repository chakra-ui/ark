import { cleanup, render } from '@testing-library/react/pure'
import { axe } from 'vitest-axe'
import { TreeView } from '..'
import { getExports, getParts } from '../../../setup-test'
import { Basic as ComponentUnderTest } from '../examples/basic'
import { treeViewAnatomy } from '../tree-view.anatomy'

describe('TreeView', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(treeViewAnatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(treeViewAnatomy))('should export %s', async (part) => {
    expect(TreeView[part]).toBeDefined()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

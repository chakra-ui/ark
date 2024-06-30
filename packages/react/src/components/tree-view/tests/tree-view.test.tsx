import { cleanup, render } from '@testing-library/react/pure'
import { anatomy } from '@zag-js/treeView'
import { axe } from 'vitest-axe'
import { TreeView } from '..'
import { getExports, getParts } from '../../../setup-test'
import { ComponentUnderTest } from './basic'

describe('TreeView', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.each(getParts(anatomy))('should render part %s', async (part) => {
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(anatomy))('should export %s', async (part) => {
    expect(TreeView[part]).toBeDefined()
  })

  it('should have no a11y violations', async () => {
    const { container } = render(<ComponentUnderTest />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})

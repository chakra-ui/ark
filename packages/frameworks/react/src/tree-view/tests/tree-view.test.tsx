import { treeViewAnatomy } from '@ark-ui/anatomy'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render } from '@testing-library/react/pure'
import { TreeView } from '..'
import { getExports, getParts } from '../../setup-test'
import { ComponentUnderTest } from './basic'

describe('TreeView', () => {
  afterAll(() => {
    cleanup()
  })

  render(<ComponentUnderTest />)

  it.skip.each(getParts(treeViewAnatomy))('should render part %s', async (part) => {
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  it.each(getExports(treeViewAnatomy))('should export %s', async (part) => {
    expect(TreeView[part]).toBeDefined()
  })
})
